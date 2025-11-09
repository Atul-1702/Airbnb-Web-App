import Redis from "ioredis";
import serverConfig from "./env.config";
import { ServiceUnavailable } from "../utils/errors/app.error";
import logger from "./winston.config";

function redisConnection() {
  let connection: Redis | null;

  return () => {
    try {
      if (!connection) {
        connection = new Redis({
          host: serverConfig.REDIS_SERVER_HOST,
          port: serverConfig.REDIS_SERVER_PORT,
          maxRetriesPerRequest: null,
          enableReadyCheck: false,
        });
        logger.info("Connected to redis server successfully");
        return connection;
      }
      return connection;
    } catch (error: unknown) {
      logger.error("Failed to connect redis server");
      throw new ServiceUnavailable("Failed to connect redis server");
    }
  };
}

const getRedisConnection = redisConnection();

export default getRedisConnection;
