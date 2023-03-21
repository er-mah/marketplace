import { Sequelize } from "sequelize";
import { config } from "dotenv";
import path from "path";
import * as fs from "fs";

config();

export const dbData = {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
  },
  production: {
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
  },
};

const env = process.env.NODE_ENV || "development";
const configuration = dbData[env];

export const db = new Sequelize(
  configuration.database,
  configuration.username,
  configuration.password,
  {
    host: configuration.host,
    dialect: "postgres",
    logging: (query) => {
      const currentDirectoryPath = path.dirname(
        new URL(import.meta.url).pathname
      );
      const logsDirectory = path.resolve(currentDirectoryPath, "../logs");

      const logFilePath = path.join(logsDirectory, "sequelize.log");
      const logMessage = `New query: ${query}\n`;

      if (!fs.existsSync(logFilePath)) {
        fs.writeFileSync(logFilePath, "");
      }

      fs.appendFileSync(logFilePath, logMessage);
    },
    define: {
      underscored: true,
    },
  }
);
