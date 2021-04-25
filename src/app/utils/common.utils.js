
class CommonUtils {
  static round = (number, precision = 0) =>
    Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision);


  static random = (min, max, int = true) => {
    if (int) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    return Math.random() * (max - min) + min;
  };

  static numericPassword = (length = 8) => {
    const charset = "0123456789";
    let password = "";
    for (let index = 0; index < length; index++) {
      password += charset.charAt(CommonUtils.random(0, charset.length));
    }
    return password;
  };

  static randomString = (prefix = "", length = 8, postFix = "") => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let string = "";
    for (let index = 0; index < length; index++) {
      string += charset.charAt(CommonUtils.random(0, charset.length));
    }
    return `${prefix}_${string}_${postFix}`;
  };

}

export default CommonUtils;
