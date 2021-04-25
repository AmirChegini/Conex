import httpStatus from "http-status";

import ErrorView from "../../../common/error.view";
import TokenDB from "../../../token/token.model";
import RedisClient from "../../../utils/redis.utils";
import TokenUtils from "../../../utils/token.utils";

const getFilters = (req) => {
  const {
    user: { userId },
  } = req;
  const token = TokenUtils.stringifyToken(req);
  return {
    filter: { userId, token },
    userId,
  };
};
const logout = async (req, res, next) => {
  try {
    const { filter, userId } = getFilters(req);
    await TokenDB.remove(filter);
    RedisClient.DEL(userId);
    return res.status(httpStatus.OK).json({
      success: true,
    });
  } catch (err) {
    return next(ErrorView.badRequest());
  }
};

export default logout;
