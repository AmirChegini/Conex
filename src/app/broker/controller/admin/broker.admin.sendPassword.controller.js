import httpStatus from "http-status";

import BrokerDB from "../../broker.model";
import TokenDB from "../../../token/token.model";
import ErrorView from "../../../common/error.view";
import RoleView from "../../../common/role.view";
import strings from "../../../../strings";
import CommonUtils from "../../../utils/common.utils";
import BroadcastUtils, { BroadcastType } from "../../../utils/broadcast.utils";
import TokenUtils from "../../../utils/token.utils";

const getFilters = async (req) => {
  const {
    user: { role, username, regions },
    params: { id },
  } = req;
  const token = await TokenUtils.token(req);
  if (token) {
    const broker = await BrokerDB.getOne({ _id: id });
    if (broker) {
      if (regions.includes(broker.region)) {
        return {
          authorized: RoleView.isAdmin(role),
          authenticated: true,
          isValid: true,
          isAllowed: true,
          password: CommonUtils.numericPassword(),
          by: { role, username },
          filter: { _id: id },
          broker,
        };
      }
      return {
        authorized: RoleView.isAdmin(role),
        authenticated: true,
        isValid: true,
        isAllowed: false,
      };
    }
    return {
      authorized: RoleView.isAdmin(role),
      authenticated: true,
      isValid: false,
    };
  }
  return {
    authorized: RoleView.isAdmin(role),
    authenticated: false,
  };
};

const sendPassword = async (req, res, next) => {
  try {
    const {
      authorized,
      authenticated,
      isValid,
      isAllowed,
      filter,
      broker,
      password,
      by,
    } = await getFilters(req);
    if (authorized) {
      if (authenticated) {
        if (isValid) {
          if (isAllowed) {
            await BrokerDB.updatePassword(filter, password, by);
            // TO DEFINE
            BroadcastUtils.notifyOTP(
              BroadcastType.BROKER_PASSWORD,
              broker.username,
              password
            );
            await BrokerDB.resetFailureAttempt({ _id: broker._id });
            await TokenDB.removeMany({ userId: broker._id });
            return res.status(httpStatus.OK).json({
              success: true,
              message: strings.broker.password_sent_to_broker,
            });
          }
          return next(ErrorView.forbidden(strings.broker.not_allowed));
        }
        return next(ErrorView.forbidden(strings.broker.broker_not_exist));
      }
      return next(ErrorView.unAuthorize(strings.admin.token_not_exists));
    }
    return next(ErrorView.unAuthorize());
  } catch (err) {
    return next(ErrorView.badRequest());
  }
};

export default sendPassword;
