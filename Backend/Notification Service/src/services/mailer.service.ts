import serverConfig from "../config/env.config";
import transporter from "../config/mailer.config";
import logger from "../config/winston.config";
import { InternalServerError } from "../utils/errors/app.error";

export async function sendEmail(to: string, subject: string, body: string) {
  try {
    await transporter.sendMail({
      from: serverConfig.GOOGLE_GMAIL,
      to,
      subject,
      html: body,
    });
    logger.info(`Mail send successfully`, { to });
  } catch (error: unknown) {
    const msg: string = (error as Error).message;
    logger.error(`Failed to send mail`, { msg });
    throw new InternalServerError(msg);
  }
}
