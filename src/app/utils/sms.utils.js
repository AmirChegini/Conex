import { BroadcastType } from "./broadcast.utils";
import Kavenegar from "kavenegar";

import config from "../../config/config";

const kavehNegarAPI = Kavenegar.KavenegarApi({
  apikey: config.kavehToken,
});

class SMSUtils {
  static send = (type, phone, ...info) => {
    switch (type) {
      case BroadcastType.BROKER_PASSWORD:
        SMSUtils.brokerPassword(phone, ...info);
        break;
      case BroadcastType.ADMIN_PASSWORD:
        SMSUtils.adminPassword(phone, ...info);
        break;
    }
  };


  static brokerPassword = (phone, password) => {
    kavehNegarAPI.VerifyLookup({
      receptor: phone,
      token: password,
      template: "visitorCode", 
    });
  };

  static adminPassword = (phone, password) => {
    kavehNegarAPI.VerifyLookup({
      receptor: phone,
      token: password,
      template: "adminCode",
    });
  };
}

export default SMSUtils;
