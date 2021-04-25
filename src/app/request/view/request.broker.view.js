class RequestBrokerView {
  static create = [
    "dumps",
    "customerId",
    "conexId",
    "referral",
    "sellPrice",
    "buyPrice",
    "paid",
    "region",
    "brokerId",
  ];
  static createBody = ["paid"];

  static one = ["_id", "dumps", "buyPrice", "paid", "createdAt"];

  static list = ["_id", "dumps", "buyPrice", "paid", "customer", "createdAt"];

  static info_customer = ["name", "phone"];
}

export default RequestBrokerView;
