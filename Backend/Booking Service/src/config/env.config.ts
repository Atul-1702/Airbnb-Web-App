import dotenv from "dotenv";

dotenv.config();

type ServerConfig = {
  PORT: number;
};
console.log(process.env.PORT);
export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 4000,
};
