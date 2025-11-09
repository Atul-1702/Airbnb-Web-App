import serverConfig from "../config/env.config";
import logger from "../config/winston.config";
import { mailerQueue } from "../queues/mailer.queue";
import NotificationDto from "./../dto/notification.dto";

const addEmailToQueue = async (payload: NotificationDto) => {
  await mailerQueue.add(serverConfig.MAILER_QUEUE_JOB_NAME, payload);
  logger.info("Payload added to queue", { payload });
};

export default addEmailToQueue;
