import Pool from "pg-pool";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { config } from "dotenv";
import { db, dbData } from "./db.js";

config();

const env = process.env.NODE_ENV || "development";
const configuration = dbData[env];

export const expressSessionInstance = async () => {
  try {

    // Connection to database with pg
    const pool = new Pool({
      user: configuration.username,
      host: configuration.host,
      database: configuration.database,
      password: configuration.password,
      port: configuration.port,
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
