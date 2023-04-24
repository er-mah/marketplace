import { Sequelize } from "sequelize";
import { config } from "dotenv";
import path from "path";
import * as fs from "fs";

config();

export const configuration = {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
  },
  test: {
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

export const db = new Sequelize(
  configuration[env].database,
  configuration[env].username,
  configuration[env].password,
  {
    host: configuration[env].host,
    dialect: "postgres",
    define: {
      underscored: true,
    },
  }
);
