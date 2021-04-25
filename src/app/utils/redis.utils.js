import redis from "redis";
import config from "../../config/config";

const RedisClient = redis.createClient(config.redis.port);
RedisClient.auth(config.redis.auth);

export default RedisClient;
