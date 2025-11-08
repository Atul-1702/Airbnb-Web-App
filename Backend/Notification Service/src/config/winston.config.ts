import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const transport: DailyRotateFile = new DailyRotateFile({
  level: "warn",
  dirname: "./logs",
  filename: "notification-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "1d",
});

const logger: winston.Logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    winston.format.json()
  ),
  transports: [
    transport,
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

transport.on("error", (error: Error) => {
  throw new Error(error.message);
});

export default logger;
