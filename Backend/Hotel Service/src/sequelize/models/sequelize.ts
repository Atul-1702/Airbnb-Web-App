import { Sequelize } from "sequelize";
import { dbConfig } from "../../config/env.config";

const sequelize: Sequelize = new Sequelize({
  host: dbConfig.DB_HOST,
  port: dbConfig.DB_PORT,
  username: dbConfig.DB_USERNAME,
  password: dbConfig.DB_PASSWORD,
  database: dbConfig.DB_NAME,
  dialect: "mysql",
});

export default sequelize;
