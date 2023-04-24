// require("newrelic");
import { createServer } from "http";
import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { config } from "dotenv";
import {
  clientErrorHandlerMdw,
  corsMdw,
  errorHandlerMdw,
  logErrorsMdw,
} from "./middlewares/index.js";
import { bulkDataInsert } from "./seeders/index.js";

import {} from "./app/models/index.js";
import { db } from "./config/db.js";

import { resolvers, typeDefs } from "./app/graphql/schema/index.js";

import { router } from "./app/routes/index.js";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import morgan from "morgan";
import { expressSessionInstance, passport } from "./config/index.js";
import {
  authenticateRequest,
  omitAuthenticationCheck,
} from "./config/passport.js";

function loadEnvVariables() {
  config();
}

async function start() {
  try {
    loadEnvVariables();

    const app = express();

    const httpServer = createServer(app);
    const PORT = process.env.PORT || 4000;
    const playgroundEnabled = process.env.NODE_ENV !== "production";

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    // Instantiate Apollo Server
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      includeStacktraceInErrorResponses: false,
      introspection: playgroundEnabled,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        process.env.NODE_ENV === "production"
          ? ApolloServerPluginLandingPageProductionDefault()
          : ApolloServerPluginLandingPageLocalDefault({ embed: false }),
      ],
    });
    await apolloServer.start();

    // Establish connection with db
    await db.authenticate();
    console.log("Successfully connected to the db.");

    // Sync models with db
    await db.sync();

    await bulkDataInsert();

    // Middlewares
    // Express session middleware
    app.use(await expressSessionInstance());

    app.use(morgan("dev"));

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(corsMdw);
    app.use(logErrorsMdw);
    app.use(clientErrorHandlerMdw);
    app.use(errorHandlerMdw);

    // Passport.js - authentication middleware
    app.use(passport.initialize({})); // Reload middleware in every route --> in order it doesn't get stale
    app.use(passport.session({})); // Express session related
    app.use(router); // Define routes

    app.use(
      "/techmogql",
      authenticateRequest,
      omitAuthenticationCheck,
      expressMiddleware(apolloServer, {
        context: async ({ req }) => {
          // Get authenticated user loaded in req object by passport-jwt

          const user = req.user || null;
          // Return user in the context
          return { user };
        },
      })
    );

    // Set up the WebSocket for handling GraphQL subscriptions
    const wsServer = new WebSocketServer({
      server: httpServer,
      path: "/techmogql", // Same path as Apollo Server
    });

    // Passing in an instance of a GraphQLSchema and telling the WebSocketServer to start listening
    const serverCleanup = useServer({ schema }, wsServer);

    app.listen(PORT);
  } catch (error) {
    console.error("Error:", error);
  }
}

start().then(() => {
  const PORT = process.env.PORT || 4000;
  console.log(`Express server ready at http://localhost:${PORT}\nApollo server ready at http://localhost:${PORT}/techmogql
  `);
});
