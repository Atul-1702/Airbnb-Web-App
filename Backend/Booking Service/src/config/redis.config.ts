import IoRedis, { Redis } from "ioredis";
import Redlock from "redlock";
import { serverConfig } from "./env.config";

export const redisServer: Redis = new IoRedis(serverConfig.REDIS_SERVER_URL);

const redLock: Redlock = new Redlock([redisServer] as unknown as any[], {
  driftFactor: 0.01,
  retryCount: 5,
  retryDelay: 400,
  retryJitter: 200,
  //@ts-ignore
  automaticExtensionThreshold: 500,
});

export default redLock;
