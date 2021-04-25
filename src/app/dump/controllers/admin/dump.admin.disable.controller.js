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
    params: { id },
    query: { disabled = "true" },
  } = req;
  const token = await TokenUtils.token(req);
  if (token) {
    if (await DumpDB.getOne({ _id: id })) {
      return {
        authorized: RoleView.isAdmin(role),
        authenticated: true,
        validDump: true,
        dumpId: id,
        updateQuery: {
          disabled: CommonView.stringToBoolean(disabled),
        },
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

const disable = async (req, res, next) => {
  try {
    const {
      authorized,
      authenticated,
      validDump,
      dumpId,
      updateQuery,
      by,
    } = await getFilters(req);
    if (authorized) {
      if (authenticated) {
        if (validDump) {
          const updatedDump = await DumpDB.disable(dumpId, updateQuery, by);
          return res.status(httpStatus.OK).json({
            success: true,
            data: {
              dump: CommonView.pick(DumpView.one, updatedDump),
            },
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

export default disable;
