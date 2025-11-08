import { Job, Worker } from "bullmq";
import serverConfig from "../config/env.config";
import logger from "../config/winston.config";
import renderMailTemplate from "../../templates/template.handle";
import getRedisConnection from "./../config/redis.config";

export default function setupMailWorker() {
  const emailProcessor = new Worker(
    serverConfig.MAILER_QUEUE_NAME,
    async (job: Job) => {
      if (job.name !== serverConfig.MAILER_QUEUE_JOB_NAME) {
        logger.error("Invalid mailer job name");
        throw new Error("Invalid job name");
      }
      const payload = job.data;
      logger.info(`Processing email to `, { payload });
      await renderMailTemplate("mailer", payload.params);
    },
    {
      connection: getRedisConnection(),
    }
  );
}
