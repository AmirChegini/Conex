class AdminAdminView {
  static list = [
    "_id",
    "firstName",
    "lastName",
    "username",
    "permissions",
    "regions",
  ];

  static one = [
    "_id",
    "firstName",
    "lastName",
    "username",
    "permissions",
    "regions",
  ];

  static update = ["firstName", "lastName", "permissions", "regions"];

  static create = [
    "firstName",
    "lastName",
    "username",
    "password",
    "permissions",
    "regions",
  ];

  static createBody = [
    "firstName",
    "lastName",
    "username",
    "permissions",
    "regions",
  ];
}

export default AdminAdminView;
