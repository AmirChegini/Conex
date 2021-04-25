import { pathOr } from "ramda";

class BrokerModel {
  static fullName = (broker) =>
    `${pathOr("", ["firstName"], broker)} ${pathOr("", ["lastName"], broker)}`;
}

export default BrokerModel;
