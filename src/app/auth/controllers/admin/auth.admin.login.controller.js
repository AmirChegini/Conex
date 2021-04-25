import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { pathOr } from "ramda";

import AdminDB from "../../../admin/admin.model";
import AuthView from "../../view/auth.admin.view";
import ErrorView from "../../../common/error.view";
import strings from "../../../../strings";
import CommonView from "../../../common/common.view";
import AdminModel from "../../../admin/view/admin.model.view";
import TokenDB from "../../../token/token.model";

const getFilters = async (req) => {
  const {
    body: { username, password },
  } = req;
  const admin = await AdminDB.getOne({ username });
  if (admin) {
    const { failureAttemptCount } = admin;
    if (failureAttemptCount < AuthView.MAX_ALLOWED_ATTEMPTS) {
      if (await bcrypt.compare(password, pathOr(null, ["password"], admin))) {
        return {
          isExisted: true,
          allowedAttempts: true,
          isValid: true,
          admin,
        };
      }
      return {
        isExisted: true,
        allowedAttempts: true,
        isValid: false,
        admin,
      };
    }

    return {
      isExisted: true,
      allowedAttempts: false,
    };
  }
  return {
    isExisted: false,
  };
};

const propagateAdmin = (admin) => {
  return {
    ...admin,
    token: AuthView.token(admin),
    fullName: AdminModel.fullName(admin),
  };
};

const login = async (req, res, next) => {
  try {
    const { isExisted, isValid, allowedAttempts, admin } = await getFilters(
      req
    );
    if (isExisted) {
      if (allowedAttempts) {
        if (isValid) {
          await AdminDB.resetFailureAttempt({ _id: admin._id });
          const propagatedAdmin = propagateAdmin(admin);
          await TokenDB.create(admin._id, propagatedAdmin.token);
          return res.status(httpStatus.OK).json({
            success: true,
            data: CommonView.pick(AuthView.login, propagatedAdmin),
          });
        }
        await AdminDB.increaseFailureAttempt({ _id: admin._id });
        return next(ErrorView.forbidden(strings.adminLogin.incorrectParameter));
      }
      return next(ErrorView.forbidden(strings.adminLogin.max_attempt_reached));
    }
    return next(ErrorView.forbidden(strings.adminLogin.incorrectParameter));
  } catch (err) {
    return next(ErrorView.badRequest());
  }
};

export default login;
