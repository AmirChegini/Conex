import httpStatus from "http-status";
import { assocPath } from "ramda";

import RequestDB from "../../request.model";
import CustomerDB from "../../../customer/customer.model";
import RequestView from "../../view/request.broker.view";
import ErrorView from "../../../common/error.view";
import CommonView from "../../../common/common.view";
import RoleView from "../../../common/role.view";
import strings from "../../../../strings";
import TokenUtils from "../../../utils/token.utils";
import DateUtils from "../../../utils/date.utils";
import RequestModel from "../../view/request.model.view";

const getFilters = async (req) => {
  const {
    user: { role, referral },
    query: { from, to, keyword },
  } = req;
  const token = await TokenUtils.token(req);
  if (token) {
    let filter = { referral };
    if (from) {
      filter = assocPath(
        ["createdAt", "$gte"],
        DateUtils.specificDay(0, true, from).from,
        filter
      );
    }
    if (to) {
      filter = assocPath(
        ["createdAt", "$lte"],
        DateUtils.specificDay(0, true, to).to,
        filter
      );
    }
    if (keyword) {
      filter.customerId = {
        $in: await CustomerDB.getIds({
          $or: [
            { username: { $regex: keyword } },
            { name: { $regex: keyword } },
          ],
        }),
      };
    }
    return {
      authorized: RoleView.isBroker(role),
      authenticated: true,
      queryFilter: { limited: false, filter },
      totalFilter: filter,
    };
  }
  return {
    authorized: RoleView.isBroker(role),
    authenticated: false,
  };
};

const propagateRequests = async (requests) => {
  const requestsInfo = await RequestModel.requestsInfo(requests);
  return requests.map((request) => {
    const { customer } = RequestModel.singleRequestInfo({
      ...requestsInfo,
      request,
    });

    return CommonView.pick(RequestView.list, {
      ...request,
      customer: CommonView.pick(RequestView.info_customer, {
        phone: customer.username,
        name: customer.name,
      }),
    });
  });
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
        const requests = await RequestDB.list(queryFilter);
        const propagatedRequests = await propagateRequests(requests);
        const total = await RequestDB.total(totalFilter);
        return res.status(httpStatus.OK).json({
          success: true,
          data: {
            total,
            requests: propagatedRequests,
          },
        });
      }
      return next(ErrorView.unAuthorize(strings.request.token_not_exists));
    }
    return next(ErrorView.unAuthorize());
  } catch (err) {
    return next(ErrorView.badRequest());
  }
};

export default list;
