import httpStatus from "http-status";

import AdminDB from "../../admin.model";
import TokenDB from "../../../token/token.model";
import ErrorView from "../../../common/error.view";
import RoleView from "../../../common/role.view";
import CommonUtils from "../../../utils/common.utils";
import strings from "../../../../strings";
import TokenUtils from "../../../utils/token.utils";
import BroadcastUtils, { BroadcastType } from "../../../utils/broadcast.utils";

const getFilters = async (req) => {
  const {
    user: { role, username },
    params: { id },
  } = req;
  const token = await TokenUtils.token(req);
  if (token) {
    const admin = await AdminDB.getOne({ _id: id });
    if (admin) {
      return {
        authorized: RoleView.isAdmin(role),
        authenticated: true,
        password: CommonUtils.numericPassword(),
        isValid: true,
        by: { role, username },
        filter: { _id: id },
        admin,
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
      filter,
      admin,
      password,
      by,
    } = await getFilters(req);
    if (authorized) {
      if (authenticated) {
        if (isValid) {
          await AdminDB.updatePassword(filter, password, by);

          BroadcastUtils.notifyOTP(
            BroadcastType.ADMIN_PASSWORD, // TO DEFINE
            admin.username,
            password
          );
          await AdminDB.resetFailureAttempt(filter);
          await TokenDB.removeMany({ userId: admin._id });
          return res.status(httpStatus.OK).json({
            success: true,
            message: strings.admin.password_sent_to_admin,
          });
        }
        return next(ErrorView.forbidden(strings.admin.not_exist));
      }
      return next(ErrorView.unAuthorize(strings.admin.token_not_exists));
    }
    return next(ErrorView.unAuthorize());
  } catch (err) {
    return next(ErrorView.badRequest());
  }
};

export default sendPassword;
