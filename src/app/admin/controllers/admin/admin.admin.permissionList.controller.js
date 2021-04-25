import httpStatus from "http-status";

import ErrorView from "../../../common/error.view";
import RoleView from "../../../common/role.view";
import Permissions from "../../../auth/permissions";
import strings from "../../../../strings";
import TokenUtils from "../../../utils/token.utils";

const getFilters = async (req) => {
  const {
    user: { role },
  } = req;
  const token = await TokenUtils.token(req);
  if (token) {
    return {
      authorized: RoleView.isAdmin(role),
      authenticated: true,
    };
  }
  return {
    authorized: RoleView.isAdmin(role),
    authenticated: false,
  };
};

const permissionList = async (req, res, next) => {
  try {
    const { authorized, authenticated } = await getFilters(req);
    if (authorized) {
      if (authenticated) {
        return res.status(httpStatus.OK).json({
          success: true,
          data: {
            permissions: Permissions.permissionList,
          },
        });
      }
      return next(ErrorView.unAuthorize(strings.admin.token_not_exists));
    }
    return next(ErrorView.unAuthorize());
  } catch (err) {
    return next(ErrorView.badRequest());
  }
};

export default permissionList;
