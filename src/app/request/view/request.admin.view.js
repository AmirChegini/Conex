class RequestAdminView {
  static list = [
    "_id",
    "customerId",
    "brokerId",
    "conexId",
    "dumps",
    "buyPrice",
    "sellPrice",
    "paid",
    "createdAt",
    "customer",
    "broker",
    "conex",
  ];

  static info_customer = ["name", "phone"];

  static info_broker = ["name", "phone"];

  static info_conex = ["name", "address"];
}

export default RequestAdminView;
