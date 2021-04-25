import strings from "../../../strings";
import { pathOr } from "ramda";

import CommonView from "../../common/common.view";

class ReportAdminView {
  static REQUEST_TITLES = [
    strings.commonWords.conexName,
    strings.commonWords.conexAddress,
    strings.commonWords.brokerName,
    strings.commonWords.brokerPhone,
    strings.commonWords.customerName,
    strings.commonWords.customerPhone,
    strings.commonWords.region,
    strings.commonWords.buyPrice,
    strings.commonWords.sellPrice,
    strings.commonWords.paid,
    strings.commonWords.createdAt,
  ];
  static CONEX_TITLES = [
    strings.commonWords.conexName,
    strings.commonWords.conexAddress,
    strings.commonWords.region,
    strings.commonWords.requestCount,
    strings.commonWords.totalBuyPrice,
    strings.commonWords.totalSellPrice,
  ];
  static dumpNames = (dumps = []) => {
    const dumpMap = new Map();
    for (const dump of dumps) {
      if (dumpMap.has(dump.key)) {
        if (dump.disabled) {
          continue;
        }
        dumpMap.set(dump.key, dump.name);
      } else {
        dumpMap.set(dump.key, dump.name);
      }
    }
    return dumpMap;
  };

  static dumpWeights = (dumps = [], dumpKeys = []) => {
    const weights = [];
    for (const key of dumpKeys) {
      const foundDump = dumps.find((item) => CommonView.isSame(key, item.key));
      weights.push(pathOr(0, ["weight"], foundDump));
    }
    return weights;
  };
  static totalDumpWeights = (requests = [], dumpKeys = []) => {
    const weights = [];
    for (const key of dumpKeys) {
      let weight = 0;
      for (const request of requests) {
        const foundDump = request.dumps.find((item) =>
          CommonView.isSame(key, item.key)
        );

        weight += pathOr(0, ["weight"], foundDump);
      }

      weights.push(weight);
    }

    return weights;
  };
}

export default ReportAdminView;
