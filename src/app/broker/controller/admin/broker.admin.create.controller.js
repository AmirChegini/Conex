import httpStatus from "http-status";
import { pathOr } from "ramda";

import BrokerDB from "../../broker.model";
import BrokerView from "../../view/broker.admin.view";
import ErrorView from "../../../common/error.view";
import CommonView from "../../../common/common.view";
import RoleView from "../../../common/role.view";
import strings from "../../../../strings";
import CommonUtils from "../../../utils/common.utils";
import TokenUtils from "../../../utils/token.utils";

const getFilters = async (req) => {
  const {
    user: { role, username, regions },
    body: { username: phone, region },
    body,
  } = req;
  const token = await TokenUtils.token(req);
  if (token) {
    if (regions.includes(region)) {
      return {
        authorized: RoleView.isAdmin(role),
        authenticated: true,
        isAllowed: true,
        createQuery: CommonView.pick(BrokerView.create, {
          ...CommonView.pick(BrokerView.createBody, body),
          password: CommonUtils.numericPassword(),
          referral: CommonUtils.randomString(
            BrokerView.BROKER,
            5,
            phone.slice(-4)
          ),
        }),
        by: {
          role,
          username,
        },
      };
    }
    return {
      authorized: RoleView.isAdmin(role),
      authenticated: true,
      isAllowed: false,
    };
  }
  return {
    authorized: RoleView.isAdmin(role),
    authenticated: false,
  };
};

const create = async (req, res, next) => {
  try {
    const {
      authorized,
      authenticated,
      isAllowed,
      createQuery,
      by,
    } = await getFilters(req);
    if (authorized) {
      if (authenticated) {
        if (isAllowed) {
          const broker = await BrokerDB.create(createQuery, by);
          return res.status(httpStatus.OK).json({
            success: true,
            data: {
              broker: CommonView.pick(BrokerView.one, broker),
            },
          });
        }
        return next(ErrorView.forbidden(strings.broker.not_allowed));
      }
      return next(ErrorView.unAuthorize(strings.admin.token_not_exists));
    }
    return next(ErrorView.unAuthorize());
  } catch (err) {
    const code = pathOr(null, ["code"], err);
    if (code === 11000) {
      return next(ErrorView.badRequest(strings.broker.already_exists));
    }
    return next(ErrorView.badRequest());
  }
};

export default create;
