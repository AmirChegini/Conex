import create from "./dump.admin.create.controller";
import list from "./dump.admin.list.controller";
import disable from "./dump.admin.disable.controller";
import remove from "./dump.admin.remove.controller";

class DumpAdminController {
  static create = create;
  static list = list;
  static disable = disable;
  static remove = remove;
}

export default DumpAdminController;
