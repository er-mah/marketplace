// require("newrelic");
// const _ = require("lodash");

require("dotenv").config();

const express = require("express");
const { execute, subscribe } = require("graphql");
const { createServer } = require("http");
const { SubscriptionServer } = require("subscriptions-transport-ws");

const schema = require("./src/app/schemas");
const { router } = require("./src/app/routes");
const {
  morganHttpLoggerMdw,
  jwtMdw,
  cors,
  corsMdw,
  bodyParserMdw,
  methodOverrideMdw,
  clientErrorHandlerMdw,
  logErrorsMdw,
  errorHandlerMdw,
} = require("./src/middlewares");


const app = express();
const ws = createServer(app);

app.use(router); // Define routes

// Middlewares
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

// Set up the WebSocket for handling GraphQL subscriptions
ws.listen(process.env.PORT || 4000, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${
      process.env.PORT || 4000
    }/graphiql`
  );

  SubscriptionServer.create(
    {
      execute,
      subscribe,
      schema,
    },
    {
      server: ws,
      path: "/subscriptions",
    }
  );
});
