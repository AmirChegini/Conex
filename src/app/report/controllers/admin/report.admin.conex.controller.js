import httpStatus from "http-status";
import { assocPath } from "ramda";

import RequestDB from "../../../request/request.model";
import ConexDB from "../../../conex/conex.model";
import DumpDB from "../../../dump/dump.model";
import RoleView from "../../../common/role.view";
import DateUtils from "../../../utils/date.utils";
import ReportView from "../../view/report.admin.view";
import ErrorView from "../../../common/error.view";
import RequestModel from "../../../request/view/request.model.view";
import ExcelUtils from "../../../utils/excel.utils";
import TokenUtils from "../../../utils/token.utils";
import CommonView from "../../../common/common.view";

const getFilters = async (req) => {
  const {
    user: { role, regions },
    query: { from, to },
  } = req;
  const token = await TokenUtils.token(req);
  if (token) {
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
const propagateRequests = async (requests) => {
  const conexes = await ConexDB.list({
    _id: { $in: requests.map((request) => request.conexId) },
  });
  const dumps = await DumpDB.list({ deleted: false });
  const groupByConexId = RequestModel.customGroupBy(requests, "conexId");
  const data = [];
  const dumpMap = ReportView.dumpNames(dumps);
  const titles = [...ReportView.CONEX_TITLES, ...dumpMap.values()];
  for (const conexId of Object.keys(groupByConexId)) {
    const conex = conexes.find((conex) =>
      CommonView.isSame(conexId, conex._id)
    );
    const conexName = conex.name;
    const conexAddress = conex.address;
    const region = conex.region;
    const conexRequests = groupByConexId[conexId];
    const requestCount = conexRequests.length;
    const totalBuyPrice = RequestModel.customReducer(conexRequests, "buyPrice");
    const totalSellPrice = RequestModel.customReducer(
      conexRequests,
      "sellPrice"
    );
    const dumpMap = ReportView.dumpNames(dumps);
    const totalDumps = ReportView.totalDumpWeights(
      conexRequests,
      Array.from(dumpMap.keys())
    );
    const dataItem = [
      conexName,
      conexAddress,
      region,
      requestCount,
      totalBuyPrice,
      totalSellPrice,
      ...totalDumps,
    ];
    data.push(dataItem);
  }
  return { data, titles };
};

const conex = async (req, res, next) => {
  try {
    const { authorized, queryFilter } = await getFilters(req);
    if (authorized) {
      const requests = await RequestDB.list(queryFilter);
      const { data: propagatedRequests, titles } = await propagateRequests(
        requests
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

export default conex;
