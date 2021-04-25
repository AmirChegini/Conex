import httpStatus from "http-status";

import ConexDB from "../../conex.model";
import CommonView from "../../../common/common.view";
import ErrorView from "../../../common/error.view";
import RoleView from "../../../common/role.view";
import NeshanUtils from "../../../utils/neshan.utils";
import strings from "../../../../strings";
import ConexView from "../../view/conex.admin.view";
import TokenUtils from "../../../utils/token.utils";

const getFilters = async (req) => {
  const {
    user: { role, username, regions },
    body: { latitude, longitude },
    body,
  } = req;
  const token = await TokenUtils.token(req);
  if (token) {
    const {
      isCover,
      region,
      estimatedAddress,
      inTrafficRegion,
      inOddEvenRegion,
    } = await NeshanUtils.getNeshanInfo({ latitude, longitude });
    if (isCover) {
      if (regions.includes(region)) {
        return {
          authorized: RoleView.isAdmin(role),
          authenticated: true,
          isCover: true,
          isAllowed: true,
          createQuery: CommonView.pick(ConexView.create, {
            ...CommonView.pick(ConexView.createBody, body),
            region,
            estimatedAddress,
            inTrafficRegion,
            inOddEvenRegion,
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
        isCover: true,
        isAllowed: false,
      };
    }
    return {
      authorized: RoleView.isAdmin(role),
      authenticated: true,
      isCover: false,
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
      isCover,
      isAllowed,
      createQuery,
      by,
    } = await getFilters(req);
    if (authorized) {
      if (authenticated) {
        if (isCover) {
          if (isAllowed) {
            const createdConex = await ConexDB.create(createQuery, by);
            return res.status(httpStatus.OK).json({
              success: true,
              data: {
                conex: CommonView.pick(ConexView.one, createdConex),
              },
            });
          }
          return next(ErrorView.forbidden(strings.conex.not_allowed));
        }
        return next(ErrorView.forbidden(strings.conex.address_not_covered));
      }
      return next(ErrorView.unAuthorize(strings.conex.token_not_exists));
    }
    return next(ErrorView.unAuthorize());
  } catch (err) {
    return next(ErrorView.badRequest());
  }
};

export default create;
