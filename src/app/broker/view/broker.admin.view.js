class BrokerAdminView {
  static create = [
    "firstName",
    "lastName",
    "username",
    "nationalCode",
    "region",
    "password",
    "referral",
  ];

  static createBody = [
    "firstName",
    "lastName",
    "username",
    "nationalCode",
    "region",
  ];

  static one = [
    "_id",
    "firstName",
    "lastName",
    "username",
    "nationalCode",
    "region",
    "conexId",
    "referral",
    "requests",
    "logs",
    "disabled",
    "createdAt",
  ];

  static list = [
    "_id",
    "firstName",
    "lastName",
    "username",
    "nationalCode",
    "region",
    "conexId",
    "referral",
    "requests",
    "disabled",
    "createdAt",
  ];

  static BROKER = "BROKER";
}

export default BrokerAdminView;
