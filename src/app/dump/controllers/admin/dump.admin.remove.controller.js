import httpStatus from "http-status";

import DumpDB from "../../dump.model";
import ErrorView from "../../../common/error.view";
import RoleView from "../../../common/role.view";
import TokenUtils from "../../../utils/token.utils";
import strings from "../../../../strings";

const getFilters = async (req) => {
  const {
    user: { role, username },
    params: { id },
  } = req;
  const token = await TokenUtils.token(req);
  if (token) {
    if (await DumpDB.getOne({ _id: id })) {
      return {
        authorized: RoleView.isAdmin(role),
        authenticated: true,
        validDump: true,
        filter: { _id: id },
        by: { role, username },
      };
    }
    return {
      authorized: RoleView.isAdmin(role),
      authenticated: true,
      validDump: false,
    };
  }
  return {
    authorized: RoleView.isAdmin(role),
    authenticated: false,
  };
};

const remove = async (req, res, next) => {
  try {
    const {
      authorized,
      authenticated,
      validDump,
      filter,
      by,
    } = await getFilters(req);
    if (authorized) {
      if (authenticated) {
        if (validDump) {
          await DumpDB.remove(filter, by);
          return res.status(httpStatus.OK).json({
            success: true,
          });
        }
        return next(ErrorView.forbidden(strings.dumps.not_exists));
      }
      return next(ErrorView.unAuthorize(strings.dumps.token_not_exists));
    }
    return next(ErrorView.unAuthorize());
  } catch (err) {
    return next(ErrorView.badRequest());
  }
};

export default remove;
