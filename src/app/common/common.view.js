import { pick as ramdaPick } from "ramda";


class CommonView {
  static DEFAULT_PAGE = 1;
  static DEFAULT_PAGE_SIZE = 50;

  static DEFAULT_LATITUDE = 51.333;
  static DEFAULT_LONGITUDE = 34.2323;

  static pick = (pickItems, data) => {
    if (!data) {
      return null;
    } else if (Array.isArray(data)) {
      return data.map((item) => ramdaPick(pickItems, item));
    } else {
      return ramdaPick(pickItems, data);
    }
  };

  static stringToBoolean = (string) => string === "true";


  static isSame = (first = "*", second = "**") => {
    if (!first && first !== 0) return false;
    if (!second && second !== 0) return false;
    return first.toString() === second.toString();
  };


  static isFalse = (string = "") => CommonView.isSame(string, "false");
}

export default CommonView;
