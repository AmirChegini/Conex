import httpStatus from "http-status";

import ConexDB from "../../conex.model";
import CommonView from "../../../common/common.view";
import ErrorView from "../../../common/error.view";
import RoleView from "../../../common/role.view";
import strings from "../../../../strings";
import ConexView from "../../view/conex.admin.view";
import TokenUtils from "../../../utils/token.utils";

const getFilters = async (req) => {
  const {
    user: { role, regions },
    query: { region, keyword },
  } = req;
  const token = await TokenUtils.token(req);
  if (token) {
    const filter = {
      region: { $in: regions },
    };
    if (region) {
      filter.region = region;
    }
    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword } },
        { address: { $regex: keyword } },
        { estimatedAddress: { $regex: keyword } },
      ];
    }
    return {
      authorized: RoleView.isAdmin(role),
      authenticated: true,
      queryFilter: { limited: false, filter },
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
        const conexes = await ConexDB.list(queryFilter);
        const total = await ConexDB.total(totalFilter);
        return res.status(httpStatus.OK).json({
          success: true,
          data: {
            total,
            conexes: CommonView.pick(ConexView.list, conexes),
          },
        });
      }
      return next(ErrorView.unAuthorize(strings.conex.token_not_exists));
    }
    return next(ErrorView.unAuthorize());
  } catch (err) {
    return next(ErrorView.badRequest());
  }
};

export default list;
