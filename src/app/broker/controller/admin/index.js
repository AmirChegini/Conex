import create from "./broker.admin.create.controller";
import sendPassword from "./broker.admin.sendPassword.controller";
import list from "./broker.admin.list.controller";

class BrokerAdminController {
  static create = create;
  static sendPassword = sendPassword;
  static list = list;
}

export default BrokerAdminController;
