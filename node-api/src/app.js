// require("newrelic");
import { config } from "dotenv";
import express from "express";
import { createServer } from "http";
import {} from "./app/models/index.js";

// TODO: MIGRATE TO graphql-ws
// https://www.apollographql.com/docs/apollo-server/data/subscriptions/#switching-from-subscriptions-transport-ws
import { SubscriptionServer } from "subscriptions-transport-ws";

//const schema = require("./src/app/schemas");
//import { router } from "./src/app/routes";
/*
import {
  morganHttpLoggerMdw,
  jwtMdw,
  cors,
  corsMdw,
  bodyParserMdw,
  methodOverrideMdw,
  clientErrorHandlerMdw,
  logErrorsMdw,
  errorHandlerMdw,
} from "./src/middlewares";

 */

import { db } from "./config/db.js";

function loadEnvVariables() {
  config();
}

async function start() {
  try {
    loadEnvVariables();

    const app = express();
    const server = createServer(app);
    const PORT = process.env.PORT || 4000;

    // Establish connection with db
    await db.authenticate();
    console.log("Connection has been established successfully.");

    // Sync models with db
    await db.sync();

    // Middlewares
    /*
      app.use(morganHttpLoggerMdw);
      app.use(jwtMdw);
      app.use(cors());
      app.use(corsMdw);
      app.use(bodyParserMdw.json);
      app.use(bodyParserMdw.urlencoded);
      app.use(methodOverrideMdw);
      app.use(logErrorsMdw);
      app.use(clientErrorHandlerMdw);
      app.use(errorHandlerMdw);


      app.use(router); // Define routes

       */

    // Set up the WebSocket for handling GraphQL subscriptions
    server.listen(PORT, () => {
      console.log(
        `\nRunning a GraphQL API server at http://localhost:${PORT}/graphiql`
      );

      // TODO: FIX SCHEMAS
      /*
    
      SubscriptionServer.create(
        {
          execute,
          subscribe,
          schema,
        },
        {
          server: server,
          path: "/subscriptions",
        }
      );
    
       */
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

start();
