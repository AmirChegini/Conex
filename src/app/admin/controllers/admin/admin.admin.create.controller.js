import httpStatus from "http-status";
import { pathOr } from "ramda";

import AdminDB from "../../admin.model";
import AdminView from "../../view/admin.admin.view";
import ErrorView from "../../../common/error.view";
import CommonView from "../../../common/common.view";
import RoleView from "../../../common/role.view";
import CommonUtils from "../../../utils/common.utils";
import strings from "../../../../strings";
import TokenUtils from "../../../utils/token.utils";

const getFilters = async (req) => {
  const {
    user: { role, username },
    body,
  } = req;
  const token = await TokenUtils.token(req);
  if (token) {
    return {
      authorized: RoleView.isAdmin(role),
      authenticated: true,
      createQuery: CommonView.pick(AdminView.create, {
        ...CommonView.pick(AdminView.createBody, body),
        password: CommonUtils.numericPassword(),
      }),
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

const create = async (req, res, next) => {
  try {
    const { authorized, authenticated, createQuery, by } = await getFilters(
      req
    );
    if (authorized) {
      if (authenticated) {
        const createdAdmin = await AdminDB.create(createQuery, by);
        return res.status(httpStatus.OK).json({
          success: true,
          data: {
            admin: CommonView.pick(AdminView.one, createdAdmin),
          },
        });
      }
      return next(ErrorView.unAuthorize(strings.admin.token_not_exists));
    }
    return next(ErrorView.unAuthorize());
  } catch (err) {
    const code = pathOr(null, ["code"], err);
    if (code === 11000) {
      return next(ErrorView.badRequest(strings.admin.already_exists));
    }
    return next(ErrorView.badRequest());
  }
};

export default create;
