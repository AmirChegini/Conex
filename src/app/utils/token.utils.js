import { pathOr } from "ramda";

import RedisClient from "./redis.utils";
import TokenDB from "../token/token.model";

class TokenUtils {
  static stringifyToken = (req) => {
    return pathOr(
      null,
      ["1"],
      pathOr("", ["headers", "authorization"], req).split(" ")
    );
  };

  static getCacheById(req) {
    const userId = pathOr(null, ["user", "userId"], req);
    return new Promise((resolve, reject) => {
      RedisClient.get(userId, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  static shelfTime = 3600;
  static async getFromDB(req) {
    const userId = pathOr(null, ["user", "userId"], req);
    return await TokenDB.getOne({
      userId,
      token: TokenUtils.stringifyToken(req),
    });
  }

  static async token(req) {
    try {
      let token;
      const userId = pathOr(null, ["user", "userId"], req);
      token = await TokenUtils.getCacheById(req);
      if (!token) {
        const tokenObj = await TokenUtils.getFromDB(req);
        token = tokenObj.token;
        RedisClient.setex(userId, TokenUtils.shelfTime, token);
      }
      return token;
    } catch (err) {}
  }
}

export default TokenUtils;
