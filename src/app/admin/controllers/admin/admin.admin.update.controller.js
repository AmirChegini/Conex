import httpStatus from "http-status";

import AdminDB from "../../admin.model";
import AdminView from "../../view/admin.admin.view";
import ErrorView from "../../../common/error.view";
import CommonView from "../../../common/common.view";
import RoleView from "../../../common/role.view";
import strings from "../../../../strings";
import TokenUtils from "../../../utils/token.utils";

const getFilters = async (req) => {
  const {
    user: { role, username },
    params: { id },
    body,
  } = req;
  const token = await TokenUtils.token(req);
  if (token) {
    return {
      authorized: RoleView.isAdmin(role),
      authenticated: true,
      updateQuery: CommonView.pick(AdminView.update, body),
      queryFilter: { _id: id },
      by: {
        role,
        username,
      },
    };
  }
  return {
    authorized: RoleView.isAdmin(role),
    authenticated: false,
  };
};
const update = async (req, res, next) => {
  try {
    const {
      authorized,
      authenticated,
      queryFilter,
      updateQuery,
      by,
    } = await getFilters(req);
    if (authorized) {
      if (authenticated) {
        if (await AdminDB.getOne(queryFilter)) {
          const admin = await AdminDB.update(queryFilter, updateQuery, by);
          return res.status(httpStatus.OK).json({
            success: true,
            data: CommonView.pick(AdminView.one, admin),
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
export default update;
