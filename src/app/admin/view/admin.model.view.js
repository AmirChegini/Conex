import { pathOr } from "ramda";

class AdminModel {
  static fullName = (admin) =>
    `${pathOr("", ["firstName"], admin)} ${pathOr("", ["lastName"], admin)}`;
}

export default AdminModel;
