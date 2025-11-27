import dotenv from "dotenv";

dotenv.config();

type ServerConfig = {
  PORT: number;
};

type DBConfig = {
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
};

const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3001,
};

const dbConfig: DBConfig = {
  DB_HOST: String(process.env.DB_HOST),
  DB_PORT: Number(process.env.DB_PORT),
  DB_NAME: String(process.env.DB_NAME),
  DB_USERNAME: String(process.env.DB_USERNAME),
  DB_PASSWORD: String(process.env.DB_PASSWORD),
};

export default serverConfig;
export { dbConfig };
