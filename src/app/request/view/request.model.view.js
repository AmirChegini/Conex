import { pathOr, groupBy, reduce } from "ramda";

import CommonView from "../../common/common.view";
import CommonUtils from "../../utils/common.utils";

import CustomerDB from "../../customer/customer.model";
import BrokerDB from "../../broker/broker.model";
import ConexDB from "../../conex/conex.model";
import strings from "../../../strings";

class RequestModel {
  static calculateBuyPrice = (dumps = [], dbDumps = []) => {
    let price = 0;
    for (const dump of dumps) {
      const selectedDump = dbDumps.find((item) =>
        CommonView.isSame(dump.key, item.key)
      );
      if (selectedDump) {
        price +=
          pathOr(0, ["price"], selectedDump) * pathOr(0, ["weight"], dump);
      }
    }
    return CommonUtils.round(price, -2);
  };

  static calculateSellPrice = (dumps = [], dbDumps = []) => {
    let price = 0;
    for (const dump of dumps) {
      const selectedDump = dbDumps.find((item) =>
        CommonView.isSame(dump.key, item.key)
      );
      if (selectedDump) {
        price +=
          pathOr(0, ["sellPrice"], selectedDump) * pathOr(0, ["weight"], dump);
      }
    }
    return CommonUtils.round(price, -2);
  };
  static requestInfoFilters = (requests) => {
    return {
      customerFilter: {
        limited: false,
        filter: {
          _id: {
            $in: requests.map((request) => request.customerId),
          },
        },
      },
      brokerFilter: {
        limited: false,
        filter: {
          _id: {
            $in: requests.map((request) => request.brokerId),
          },
        },
      },
      conexFilter: {
        limited: false,
        filter: {
          _id: {
            $in: requests.map((request) => request.conexId),
          },
        },
      },
    };
  };
  static requestsInfo = async (requests) => {
    const {
      customerFilter,
      brokerFilter,
      conexFilter,
    } = RequestModel.requestInfoFilters(requests);
    const customers = await CustomerDB.list(customerFilter);
    const brokers = await BrokerDB.list(brokerFilter);
    const conexes = await ConexDB.list(conexFilter);
    return {
      customers,
      brokers,
      conexes,
    };
  };
  static singleRequestInfo = ({
    request,
    customers = [],
    brokers = [],
    conexes = [],
  }) => {
    const customer = customers.find((item) =>
      CommonView.isSame(item._id, request.customerId)
    );
    const broker = brokers.find((item) =>
      CommonView.isSame(item._id, request.brokerId)
    );
    const conex = conexes.find((item) =>
      CommonView.isSame(item._id, request.conexId)
    );
    return {
      customer,
      broker,
      conex,
    };
  };

  static payStatus = (request) => {
    return request.paid ? strings.commonWords.yes : strings.commonWords.no;
  };
  static applyDumpInfo = (
    requestDumps = [],
    dbDumps = [],
    updatePrice = true
  ) => {
    return requestDumps.map((dump) => {
      const selectedDump = dbDumps.find((item) =>
        CommonView.isSame(dump.key, item.key)
      );
      if (selectedDump) {
        if (updatePrice) {
          return {
            ...dump,
            name: pathOr("", ["name"], selectedDump),
            price: pathOr(0, ["price"], selectedDump),
          };
        } else {
          return {
            ...dump,
            name: pathOr("", ["name"], selectedDump),
          };
        }
      }
      return dump;
    });
  };
  static customGroupBy = (items, arg) => groupBy((item) => item[arg])(items);
  static customReducer = (items, arg) => {
    const reducer = (a, b) => a + b[arg];
    return reduce(reducer, 0, items);
  };
}

export default RequestModel;
