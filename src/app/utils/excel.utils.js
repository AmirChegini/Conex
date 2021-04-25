import excel from "excel4node";
import DateUtils from "./date.utils";

class ExcelUtils {
  static REQUEST = "Request";

  static writeAsync = (workbook, filePath) => {
    return new Promise((resolve, reject) => {
      workbook.write(filePath, function (err) {
        if (err) {
          reject();
        } else {
          resolve();
        }
      });
    });
  };

  static pathCreator = (name) => `/tmp/${name}`;

  static nameCreator = (type, ext = "xlsx") =>
    `${type}_${DateUtils.timeStamp()}.${ext}`;

  static stringNormalizer = (string) => {
    if (!string && string !== 0) return "";

    return `${string
      .toString()
      .replace(/,/g, "،")
      .replace(/\t/g, "،")
      .replace(/\n/g, "،")}`;
  };

  static styles = {
    title: {
      font: {
        color: "#000000",
        size: 14,
      },
    },
    body: {
      font: {
        color: "#0a0a0a",
        size: 12,
      },
    },
  };

  static addRow = (array = [], worksheet, row, style) => {
    for (const [index, item] of array.entries()) {
      worksheet
        .cell(row, index + 1)
        .string(item)
        .style(style);
    }
  };

  static getInstance = () => {
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");
    return { workbook, worksheet };
  };

  static generateExcel = async (data, titles, type) => {
    const fileName = ExcelUtils.nameCreator(type);
    const filePath = ExcelUtils.pathCreator(fileName);

    const { workbook, worksheet } = ExcelUtils.getInstance();

    ExcelUtils.addRow(titles, worksheet, 1, ExcelUtils.styles.title);

    for (const [index, rowItems] of data.entries()) {
      const rowData = [];
      for (const item of rowItems) {
        rowData.push(ExcelUtils.stringNormalizer(item));
      }
      ExcelUtils.addRow(rowData, worksheet, index + 2, ExcelUtils.styles.body);
    }

    await ExcelUtils.writeAsync(workbook, filePath);

    return { filePath, fileName };
  };
}

export default ExcelUtils;
