import Redis from "ioredis";
import serverConfig from "./env.config";
import { ServiceUnavailable } from "../utils/errors/app.error";

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
        return connection;
      }
      return connection;
    } catch (error: unknown) {
      throw new ServiceUnavailable("Failed to connect redis server");
    }
  };
}

const getRedisConnection = redisConnection();

export default getRedisConnection;
