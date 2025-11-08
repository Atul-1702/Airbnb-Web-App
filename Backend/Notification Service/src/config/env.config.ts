import dotenv from "dotenv";
dotenv.config();

type ServerConfig = {
  PORT: number;
  REDIS_SERVER_HOST: string;
  REDIS_SERVER_PORT: number;
  MAILER_QUEUE_NAME: string;
  MAILER_QUEUE_JOB_NAME: string;
};

const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3100,
  REDIS_SERVER_HOST: process.env.REDIS_SERVER_HOST || "redis://localhost:6379",
  REDIS_SERVER_PORT: Number(process.env.REDIS_SERVER_PORT) || 6379,
  MAILER_QUEUE_NAME: process.env.MAILER_QUEUE_NAME || "",
  MAILER_QUEUE_JOB_NAME: process.env.MAILER_QUEUE_JOB_NAME || "",
};

export default serverConfig;
