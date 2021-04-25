class ConexAdminView {
  static create = [
    "name",
    "address",
    "estimatedAddress",
    "latitude",
    "longitude",
    "region",
    "inTrafficRegion",
    "inOddEvenRegion",
  ];

  static createBody = ["name", "address", "latitude", "longitude"];

  static one = [
    "_id",
    "name",
    "address",
    "estimatedAddress",
    "latitude",
    "longitude",
    "region",
    "inTrafficRegion",
    "inOddEvenRegion",
    "brokerId",
    "createdAt",
    "broker",
  ];

  static list = [
    "_id",
    "name",
    "address",
    "estimatedAddress",
    "latitude",
    "longitude",
    "region",
    "inTrafficRegion",
    "inOddEvenRegion",
    "brokerId",
    "disabled",
    "createdAt",
    "broker",
  ];
}

export default ConexAdminView;
