import { Job, Worker } from "bullmq";
import serverConfig from "../config/env.config";
import logger from "../config/winston.config";
import renderMailTemplate from "../../templates/template.handle";
import getRedisConnection from "./../config/redis.config";
import { sendEmail } from "../services/mailer.service";
import NotificationDto from "../dto/notification.dto";
import { InternalServerError } from "../utils/errors/app.error";

export default function setupMailWorker() {
  const emailProcessor = new Worker(
    serverConfig.MAILER_QUEUE_NAME,
    async (job: Job) => {
      if (job.name !== serverConfig.MAILER_QUEUE_JOB_NAME) {
        logger.error("Invalid mailer job name");
        throw new Error("Invalid job name");
      }
      const payload: NotificationDto = job.data;
      logger.info(`Processing email to `, { payload });
      const body = await renderMailTemplate("mailer", payload.params);
      await sendEmail(payload.to, payload.subject, body);
    },
    {
      connection: getRedisConnection(),
    }
  );

  emailProcessor.on("error", (err: unknown) => {
    logger.error("Failed to process the queue data", { err });
    throw new InternalServerError("Failed to process the queue data");
  });
  emailProcessor.on("completed", (err: unknown) => {
    logger.info("Connected successfully for processing the queue data");
  });
}
