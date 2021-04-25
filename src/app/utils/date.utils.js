import moment from "moment-jalaali";

class DateUtils {
  static specificDay = (days = 0, add = true, date) => {
    if (add) {
      return {
        from: moment(date)
          .utc(0)
          .add(3.5, "hours")
          .add(days, "days")
          .startOf("day")
          .subtract(3.5, "hours"),
        to: moment(date)
          .utc(0)
          .add(3.5, "hours")
          .add(days, "days")
          .endOf("day")
          .subtract(3.5, "hours"),
      };
    } else {
      return {
        from: moment(date)
          .utc(0)
          .add(3.5, "hours")
          .subtract(days, "days")
          .startOf("day")
          .subtract(3.5, "hours"),
        to: moment(date)
          .utc(0)
          .add(3.5, "hours")
          .subtract(days, "days")
          .endOf("day")
          .subtract(3.5, "hours"),
      };
    }
  };
  static localDateTime = (date) => {
    try {
      if (!date) return "";
      return DateUtils.local(date).format("jYYYY/jMM/jDD HH:mm");
    } catch (err) {
      return "";
    }
  };
  static timeStamp = () => DateUtils.local().format("jYYYY_jMM_jDD_HH_mm");
  static local = (date) => moment(date).utcOffset(0).add(3.5, "hours");
}

export default DateUtils;
