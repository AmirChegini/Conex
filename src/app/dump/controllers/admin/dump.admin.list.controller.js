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
    user: { role },
    query: {
      page = CommonView.DEFAULT_PAGE,
      limit = CommonView.DEFAULT_PAGE_SIZE,
      disabled = "",
      limited = "true",
    },
  } = req;
  const token = await TokenUtils.token(req);
  if (token) {
    const filter = {
      deleted: false,
    };
    if (CommonView.isFalse(disabled)) {
      filter.disabled = false;
    }

    return {
      authorized: RoleView.isAdmin(role),
      authenticated: true,
      queryFilter: {
        skip: (page - 1) * limit,
        limit,
        filter,
        limited: CommonView.stringToBoolean(limited),
      },
      totalFilter: filter,
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
        const dumps = await DumpDB.list(queryFilter);
        const total = await DumpDB.total(totalFilter);
        return res.status(httpStatus.OK).json({
          success: true,
          data: {
            total,
            dumps: CommonView.pick(DumpView.list, dumps),
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
export default list;
