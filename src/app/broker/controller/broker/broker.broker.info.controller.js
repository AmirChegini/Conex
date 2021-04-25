import httpStatus from "http-status";
import { pathOr } from "ramda";

import BrokerDB from "../../broker.model";
import ConexDB from "../../../conex/conex.model";
import BrokerView from "../../view/broker.broker.view";
import ErrorView from "../../../common/error.view";
import CommonView from "../../../common/common.view";
import RoleView from "../../../common/role.view";
import TokenUtils from "../../../utils/token.utils";
import strings from "../../../../strings";

const getFilters = async (req) => {
  const {
    user: { role, userId },
  } = req;
  const token = await TokenUtils.token(req);
  if (token) {
    return {
      authorized: RoleView.isBroker(role),
      authenticated: true,
      queryFilter: { _id: userId },
    };
  }
  return {
    authorized: RoleView.isBroker(role),
    authenticated: false,
  };
};

const propagateBroker = async (broker) => {
  const conexId = pathOr(null, ["conexId"], broker);
  const conex = await ConexDB.getOne({ _id: conexId });
  const conexAddress = pathOr("", ["address"], conex);
  return CommonView.pick(BrokerView.info, {
    ...broker,
    conexAddress,
  });
};

const info = async (req, res, next) => {
  try {
    const { authorized, authenticated, queryFilter } = await getFilters(req);
    if (authorized) {
      if (authenticated) {
        const broker = await BrokerDB.getOne(queryFilter);
        if (broker) {
          const propagatedBroker = await propagateBroker(broker);

          return res.status(httpStatus.OK).json({
            success: true,
            data: {
              broker: propagatedBroker,
            },
          });
        }
        return next(ErrorView.forbidden(strings.broker.broker_not_found));
      }
      return next(ErrorView.unAuthorize(strings.dumps.token_not_exists));
    }
    return next(ErrorView.unAuthorize());
  } catch (err) {
    return next(ErrorView.badRequest());
  }
};

export default info;
