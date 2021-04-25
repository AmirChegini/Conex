import httpStatus from "http-status";

import strings from "../../strings/index";
import ExtendedError from "../../utils/extendedError";

const authorize = (permission) => async (req, res, next) => {
  try {
    const { role } = req.user;
    switch (role) {
      case "ADMIN": {
        const { permissions = [] } = req.user;
        if (permissions.includes(permission)) {
          return next();
        }

        return next(
          new ExtendedError(
            strings.authorize.not_authorized,
            httpStatus.UNAUTHORIZED,
            true
          )
        );
      }

      default:
        return next();
    }
  } catch (err) {
    return next(
      new ExtendedError(
        strings.authorize.exception,
        httpStatus.BAD_REQUEST,
        true
      )
    );
  }
};

export default authorize;
