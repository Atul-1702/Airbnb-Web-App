import express, { Express } from "express";
import logger from "./config/winston.config";
import serverConfig from "./config/env.config";
import addEmailToQueue from "./producers/email.producer";
import setupMailWorker from "./processors/email.processor";

const app: Express = express();

app.listen(serverConfig.PORT, () => {
  logger.info(`Express server is running at port ${serverConfig.PORT}`);
  // addEmailToQueue({
  //   to: "abcd@gmail.com",
  //   subject: "abcd",
  //   templateId: "mailer",
  //   params: {
  //     name: "Atul",
  //   },
  // });

  setupMailWorker();
});
