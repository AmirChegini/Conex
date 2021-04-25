import httpStatus from "http-status";

import ExtendedError from "../../utils/extendedError";
import strings from "../../strings";

class ErrorView {
  static unAuthorize = (message) => {
    return new ExtendedError(
      message || strings.common.not_authorized,
      httpStatus.UNAUTHORIZED,
      true
    );
  };
  static badRequest = (message) => {
    return new ExtendedError(
      message || strings.common.exception,
      httpStatus.BAD_REQUEST,
      true
    );
  };
  static forbidden = (message) => {
    return new ExtendedError(
      message || strings.common.forbidden,
      httpStatus.FORBIDDEN,
      true
    );
  };
}

export default ErrorView;
