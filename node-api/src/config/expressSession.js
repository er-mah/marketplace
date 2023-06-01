import Pool from "pg-pool";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { config } from "dotenv";
import {configuration} from "./db.js";

config();

const env = process.env.NODE_ENV || "development";

export const expressSessionInstance = async () => {
  try {

    // Connection to database with pg
    const pool = new Pool({
      user: configuration[env].username,
      host: configuration[env].host,
      database: configuration[env].database,
      password: configuration[env].password,
      port: configuration[env].port,
    });

    // Express-session storage with postgres
    const PgSession = connectPgSimple(session);

    const sessionStore = new PgSession({
      pool: pool,
      tableName: "user_sessions",
    });

    return session({
      secret: process.env.SESSION_SECRET,
      resave: false, // the session is re-saved only if there have been changed
      saveUninitialized: true, // the session is saved always
      store: sessionStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 hs
      },
    });
  } catch (e) {
    throw new Error(e.message);
  }
};
