import httpStatus from "http-status";

import RequestDB from "../../request.model";
import CustomerDB from "../../../customer/customer.model";
import DumpDB from "../../../dump/dump.model";
import BrokerDB from "../../../broker/broker.model";
import RequestView from "../../view/request.broker.view";
import RequestModel from "../../view/request.model.view";
import ErrorView from "../../../common/error.view";
import CommonView from "../../../common/common.view";
import RoleView from "../../../common/role.view";
import strings from "../../../../strings";
import TokenUtils from "../../../utils/token.utils";

const getFilters = async (req) => {
  const {
    user: { role, username, referral, region, userId },
    body: { dumps, phone, name, gender, paid },
    body,
  } = req;
  const token = await TokenUtils.token(req);
  if (token) {
    let customer;
    customer = await CustomerDB.getOne({ username: phone });
    if (!customer) {
      customer = await CustomerDB.create(
        { username: phone, name, gender, referral, region },
        { role, username }
      );
    }
    const customerId = customer._id;
    const dbDumps = await DumpDB.list({ disabled: false, deleted: false });
    const { conexId } = await BrokerDB.getOne({ username });
    return {
      authorized: RoleView.isBroker(role),
      authenticated: true,
      createQuery: CommonView.pick(RequestView.create, {
        ...CommonView.pick(RequestView.createBody, body),
        customerId,
        conexId,
        referral,
        dumps: RequestModel.applyDumpInfo(dumps, dbDumps),
        buyPrice: RequestModel.calculateBuyPrice(dumps, dbDumps),
        sellPrice: RequestModel.calculateSellPrice(dumps, dbDumps),
        region,
        brokerId: userId,
      }),
      by: {
        role,
        username,
      },
      customerId,
      paid,
    };
  }
  return {
    authorized: RoleView.isBroker(role),
    authenticated: false,
  };
};

const create = async (req, res, next) => {
  try {
    const {
      authorized,
      authenticated,
      createQuery,
      by,
      customerId,
      paid,
    } = await getFilters(req);
    if (authorized) {
      if (authenticated) {
        const createdRequest = await RequestDB.create(createQuery, by);
        await CustomerDB.addRequest({ _id: customerId }, createdRequest, by);
        if (!paid) {
          const credit = await CustomerDB.updateCredit(
            { _id: customerId },
            createQuery.buyPrice
          );
        }
        return res.status(httpStatus.OK).json({
          success: true,
          data: {
            request: CommonView.pick(RequestView.one, createdRequest),
          },
        });
      }
      return next(ErrorView.unAuthorize(strings.request.token_not_exists));
    }
    return next(ErrorView.unAuthorize());
  } catch (err) {
    return next(ErrorView.badRequest());
  }
};

export default create;
