import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { pathOr } from "ramda";

import BrokerDB from "../../../broker/broker.model";
import TokenDB from "../../../token/token.model";
import ErrorView from "../../../common/error.view";
import strings from "../../../../strings";
import AuthView from "../../view/auth.broker.view";

const getFilters = async (req) => {
  const {
    body: { username, password },
  } = req;
  const broker = await BrokerDB.getOne({ username });
  if (broker) {
    const { failureAttemptCount } = broker;
    if (failureAttemptCount < AuthView.MAX_ALLOWED_ATTEMPTS) {
      if (await bcrypt.compare(password, pathOr(null, ["password"], broker))) {
        return {
          isExisted: true,
          allowedAttempts: true,
          isValid: true,
          broker,
        };
      }
      return {
        isExisted: true,
        allowedAttempts: true,
        isValid: false,
        broker,
      };
    }

    return {
      isExisted: true,
      allowedAttempts: false,
    };
  }
  return {
    isExisted: false,
  };
};

const login = async (req, res, next) => {
  try {
    const { isExisted, isValid, allowedAttempts, broker } = await getFilters(
      req
    );
    if (isExisted) {
      if (allowedAttempts) {
        if (isValid) {
          await BrokerDB.resetFailureAttempt({ _id: broker._id });
          const token = AuthView.token(broker);
          await TokenDB.removeMany({ userId: broker._id });
          await TokenDB.create(broker._id, token);
          return res.status(httpStatus.OK).json({
            success: true,
            data: {
              token,
            },
          });
        }
        await BrokerDB.increaseFailureAttempt({ _id: broker._id });
        return next(
          ErrorView.forbidden(strings.brokerLogin.incorrectParameter)
        );
      }
      return next(ErrorView.forbidden(strings.brokerLogin.max_attempt_reached));
    }
    return next(ErrorView.forbidden(strings.brokerLogin.incorrectParameter));
  } catch (err) {
    return next(ErrorView.badRequest());
  }
};

export default login;
