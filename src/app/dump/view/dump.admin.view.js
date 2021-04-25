class DumpAdminView {
  static list = ["_id", "name", "key", "sellPrice", "price", "disabled"];

  static createBody = ["name", "key", "sellPrice", "price", "disabled"];

  static create = ["name", "key", "sellPrice", "price", "disabled"];

  static one = [
    "_id",
    "name",
    "key",
    "sellPrice",
    "price",
    "disabled",
    "createdAt",
  ];
}
export default DumpAdminView;
