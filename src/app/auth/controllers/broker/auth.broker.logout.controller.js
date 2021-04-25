import httpStatus from "http-status";

import ErrorView from "../../../common/error.view";
import TokenDB from "../../../token/token.model";
import RedisClient from "../../../utils/redis.utils";

const getFilters = (req) => {
  const {
    user: { userId },
  } = req;
  return {
    filter: { userId },
    userId,
  };
};
const logout = async (req, res, next) => {
  try {
    const { filter, userId } = getFilters(req);
    await TokenDB.removeMany(filter);
    RedisClient.DEL(userId);
    return res.status(httpStatus.OK).json({
      success: true,
    });
  } catch (err) {
    return next(ErrorView.badRequest());
  }
};

export default logout;
