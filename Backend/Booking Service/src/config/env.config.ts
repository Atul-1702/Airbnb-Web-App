import dotenv from "dotenv";

dotenv.config();

type ServerConfig = {
  PORT: number;
  REDIS_SERVER_URL: string;
  LOCK_TTL: number;
};

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 4000,
  REDIS_SERVER_URL:
    String(process.env.REDIS_SERVER_URL) || "redis://localhost:6379",
  LOCK_TTL: Number(process.env.LOCK_TTL) || 300000,
};
