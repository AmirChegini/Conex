import CustomerDB from "../customer/customer.model";
import SMSUtils from "./sms.utils";

class BroadcastUtils {
  static SMS = ["SMS"];

  static NOTIFY_SMS = "SMS";

  static isSMS = (notifyType) => BroadcastUtils.SMS.includes(notifyType);

  static notify = async (
    customerId,
    notifyType = BroadcastUtils.NOTIFY_SMS,
    smsType,
    ...info
  ) => {
    const customer = await CustomerDB.getOne({ _id: customerId });
    if (BroadcastUtils.isSMS(notifyType)) {
      SMSUtils.send(smsType, customer.username, customer.firstName, ...info);
    }
  };

  static notifyOTP = (smsType, phone, password) => {
    SMSUtils.send(smsType, phone, password);
  };
}

class BroadcastType {

  static BROKER_PASSWORD = "BROKER_PASSWORD";
  static ADMIN_PASSWORD = "ADMIN_PASSWORD";
}

export default BroadcastUtils;
export { BroadcastType };
