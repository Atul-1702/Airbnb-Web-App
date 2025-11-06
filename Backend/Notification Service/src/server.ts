import express, { Express } from "express";
import logger from "./config/winston.config";

const app: Express = express();

app.listen(4000, () => {
  console.log("Server is started successfully.");
  logger.info("Express server is running at port 4000");
});
