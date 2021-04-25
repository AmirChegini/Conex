import httpStatus from "http-status";

import AdminDB from "../../admin.model";
import AdminView from "../../view/admin.admin.view";
import ErrorView from "../../../common/error.view";
import CommonView from "../../../common/common.view";
import RoleView from "../../../common/role.view";
import TokenUtils from "../../../utils/token.utils";
import strings from "../../../../strings";

const getFilters = async (req) => {
  const {
    user: { role },
  } = req;
  const token = await TokenUtils.token(req);
  if (token) {
    return {
      authorized: RoleView.isAdmin(role),
      authenticated: true,
      queryFilter: { limited: false },
      totalFilter: {},
    };
  }
  return {
    authorized: RoleView.isAdmin(role),
    authenticated: false,
  };
};

const list = async (req, res, next) => {
  try {
    const {
      authorized,
      authenticated,
      queryFilter,
      totalFilter,
    } = await getFilters(req);
    if (authorized) {
      if (authenticated) {
        const admins = await AdminDB.list(queryFilter);
        const total = await AdminDB.total(totalFilter);
        return res.status(httpStatus.OK).json({
          success: true,
          data: {
            total,
            admins: CommonView.pick(AdminView.list, admins),
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

export default list;
