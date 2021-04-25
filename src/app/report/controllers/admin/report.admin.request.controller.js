import httpStatus from "http-status";
import { assocPath, pathOr } from "ramda";

import RequestDB from "../../../request/request.model";
import CustomerDB from "../../../customer/customer.model";
import DumpDB from "../../../dump/dump.model";
import RoleView from "../../../common/role.view";
import DateUtils from "../../../utils/date.utils";
import ReportView from "../../view/report.admin.view";
import ErrorView from "../../../common/error.view";
import RequestModel from "../../../request/view/request.model.view";
import BrokerModel from "../../../broker/view/broker.model.view";
import ExcelUtils from "../../../utils/excel.utils";
import TokenUtils from "../../../utils/token.utils";

const getFilters = async (req) => {
  const {
    user: { role, regions },
    query: { from, to, keyword, brokerId },
  } = req;
  const token = await TokenUtils.token(req);
  if (token) {
    const dumps = await DumpDB.list({ deleted: false });
    let filter = { region: { $in: regions } };
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
    if (brokerId) {
      filter.brokerId = brokerId;
    }
    return {
      authorized: RoleView.isAdmin(role),
      authenticated: true,
      queryFilter: { limited: false, filter },
      totalFilter: filter,
      dumps,
    };
  }
  return {
    authorized: RoleView.isAdmin(role),
    authenticated: false,
  };
};
const propagateRequests = async (requests, dumps) => {
  const requestsInfo = await RequestModel.requestsInfo(requests);
  const dumpMap = ReportView.dumpNames(dumps);
  const titles = [...ReportView.REQUEST_TITLES, ...dumpMap.values()];
  const data = [];
  for (const request of requests) {
    const { customer, broker, conex } = RequestModel.singleRequestInfo({
      ...requestsInfo,
      request,
    });

    const dataItem = [
      conex.name,
      conex.address,
      BrokerModel.fullName(broker),
      broker.username,
      customer.name,
      customer.username,
      request.region,
      pathOr(0, ["buyPrice"], request),
      pathOr(0, ["sellPrice"], request),
      RequestModel.payStatus(request),
      DateUtils.localDateTime(request.createdAt),
      ...ReportView.dumpWeights(request.dumps, Array.from(dumpMap.keys())),
    ];

    data.push(dataItem);
  }
  return { data, titles };
};

const request = async (req, res, next) => {
  try {
    const { authorized, queryFilter, dumps } = await getFilters(req);
    if (authorized) {
      const requests = await RequestDB.list(queryFilter);
      const { data: propagatedRequests, titles } = await propagateRequests(
        requests,
        dumps
      );
      const { filePath, fileName } = await ExcelUtils.generateExcel(
        propagatedRequests,
        titles,
        ExcelUtils.REQUEST
      );

      return res.status(httpStatus.OK).download(filePath, fileName);
    }
    return next(ErrorView.unAuthorize());
  } catch (err) {
    return next(ErrorView.badRequest());
  }
};

export default request;
