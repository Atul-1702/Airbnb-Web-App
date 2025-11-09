import nodemailer from "nodemailer";
import serverConfig from "./env.config";
import { InternalServerError } from "../utils/errors/app.error";
import logger from "./winston.config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: serverConfig.GOOGLE_GMAIL,
    pass: serverConfig.GOOGLE_APP_PASSWORD,
  },
});

transporter.on("error", (err: unknown) => {
  const msg = (err as Error).message;
  logger.error(`Error while configuring nodemailer`, { msg });
  throw new InternalServerError(msg);
});

export default transporter;
