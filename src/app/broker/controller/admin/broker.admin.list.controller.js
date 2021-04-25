import httpStatus from "http-status";

import BrokerDB from "../../broker.model";
import BrokerView from "../../view/broker.admin.view";
import ErrorView from "../../../common/error.view";
import CommonView from "../../../common/common.view";
import RoleView from "../../../common/role.view";
import TokenUtils from "../../../utils/token.utils";
import strings from "../../../../strings";

const getFilters = async (req) => {
  const {
    user: { role, regions },
    query: {
      page = CommonView.DEFAULT_PAGE,
      limit = CommonView.DEFAULT_PAGE_SIZE,
      keyword = "",
    },
  } = req;
  const token = await TokenUtils.token(req);
  if (token) {
    const filter = { deleted: false, region: { $in: regions } };

    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword } },
        { username: { $regex: keyword } },
      ];
    }

    return {
      authorized: RoleView.isAdmin(role),
      authenticated: true,
      queryFilter: {
        skip: (page - 1) * limit,
        limit,
        filter,
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
        const brokers = await BrokerDB.list(queryFilter);
        const total = await BrokerDB.total(totalFilter);

        return res.status(httpStatus.OK).json({
          success: true,
          data: {
            total,
            brokers: CommonView.pick(BrokerView.list, brokers),
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
