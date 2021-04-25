import httpStatus from "http-status";

import ConexDB from "../../conex.model";
import BrokerDB from "../../../broker/broker.model";
import CommonView from "../../../common/common.view";
import ErrorView from "../../../common/error.view";
import RoleView from "../../../common/role.view";
import strings from "../../../../strings";
import ConexView from "../../view/conex.admin.view";
import TokenUtils from "../../../utils/token.utils";
import BrokerModel from "../../../broker/view/broker.model.view";

const getFilters = async (req) => {
  const {
    user: { role, username, regions },
    params: { id },
    body: { brokerId },
  } = req;
  const token = await TokenUtils.token(req);
  if (token) {
    if (await ConexDB.getOne({ _id: id, region: { $in: regions } })) {
      const broker = await BrokerDB.getOne({
        _id: brokerId,
        region: { $in: regions },
      });
      if (broker) {
        return {
          authorized: RoleView.isAdmin(role),
          authenticated: true,
          validConex: true,
          validBroker: true,
          filter: { _id: id },
          brokerId,
          broker,
          by: {
            role,
            username,
          },
        };
      }
      return {
        authorized: RoleView.isAdmin(role),
        authenticated: true,
        validConex: true,
        validBroker: false,
      };
    }
    return {
      authorized: RoleView.isAdmin(role),
      authenticated: true,
      validConex: false,
    };
  }

  return {
    authorized: RoleView.isAdmin(role),
    authenticated: false,
  };
};

const propagateConex = (conex, broker) => {
  return {
    ...conex,
    broker: {
      fullName: BrokerModel.fullName(broker),
      username: broker.username,
    },
  };
};
const assign = async (req, res, next) => {
  try {
    const {
      authorized,
      authenticated,
      validConex,
      validBroker,
      filter,
      brokerId,
      broker,
      by,
    } = await getFilters(req);
    if (authorized) {
      if (authenticated) {
        if (validConex) {
          if (validBroker) {
            const assignedConex = await ConexDB.assign(filter, brokerId, by);
            await BrokerDB.assign({ _id: brokerId }, assignedConex._id, by);
            const propagatedConex = propagateConex(assignedConex, broker);
            return res.status(httpStatus.OK).json({
              success: true,
              data: {
                conex: CommonView.pick(ConexView.one, propagatedConex),
              },
            });
          }
          return next(ErrorView.forbidden(strings.conex.broker_not_exists));
        }
        return next(ErrorView.forbidden(strings.conex.conex_not_exists));
      }
      return next(ErrorView.unAuthorize(strings.conex.token_not_exists));
    }
    return next(ErrorView.unAuthorize());
  } catch (err) {
    return next(ErrorView.badRequest());
  }
};

export default assign;
