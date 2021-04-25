import list from "./admin.admin.list.controller";
import create from "./admin.admin.create.controller";
import permissionList from "./admin.admin.permissionList.controller";
import update from "./admin.admin.update.controller";
import sendPassword from "./admin.admin.sendPassword.controller";

class AdminAdminController {
  static list = list;
  static create = create;
  static permissionList = permissionList;
  static update = update;
  static sendPassword = sendPassword;
}

export default AdminAdminController;
