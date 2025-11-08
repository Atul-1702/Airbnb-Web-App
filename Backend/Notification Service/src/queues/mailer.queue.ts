import { Queue } from "bullmq";
import serverConfig from "../config/env.config";
import getRedisConnection from "../config/redis.config";

export const mailerQueue = new Queue(serverConfig.MAILER_QUEUE_NAME, {
  connection: getRedisConnection(),
});
