import httpStatus from "http-status";

import DumpDB from "../../dump.model";
import DumpView from "../../view/dump.admin.view";
import ErrorView from "../../../common/error.view";
import CommonView from "../../../common/common.view";
import RoleView from "../../../common/role.view";
import TokenUtils from "../../../utils/token.utils";
import strings from "../../../../strings";

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
      createQuery: CommonView.pick(
        DumpView.create,
        CommonView.pick(DumpView.createBody, body)
      ),
      by: { role, username },
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
        const createdDump = await DumpDB.create(createQuery, by);
        return res.status(httpStatus.OK).json({
          success: true,
          data: {
            dump: CommonView.pick(DumpView.one, createdDump),
          },
        });
      }
      return next(ErrorView.unAuthorize(strings.dumps.token_not_exists));
    }
    return next(ErrorView.unAuthorize());
  } catch (err) {
    return next(ErrorView.badRequest());
  }
};

export default create;
