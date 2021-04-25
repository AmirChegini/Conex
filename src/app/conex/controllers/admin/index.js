import create from "./conex.admin.create.controller";
import list from "./conex.admin.list.controller";
import assign from "./conex.admin.assign.controller";

class ConexAdminController {
  static create = create;
  static list = list;
  static assign = assign;
}

export default ConexAdminController;
