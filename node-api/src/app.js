require("newrelic");
require("dotenv").config();

const express = require("express");
const jwt = require("express-jwt");
const bodyParser = require("body-parser");
const _ = require("lodash");
const methodOverride = require("method-override");
const morgan = require("morgan");
const cors = require("cors");
const schema = require("./schema");
const { execute, subscribe } = require("graphql");
const { createServer } = require("http");
const { SubscriptionServer } = require("subscriptions-transport-ws");

const { router, openRoutes } = require("./routes");
const {logErrors, clientErrorHandler, errorHandler} = require("./middlewares/errorHandlers");

// SERVER CONFIGURATION ----------------------------------------------

const app = express();

app.use(cors());

// HTTP request logger en consola para detalles adicionales de las solicitudes y las respuestas
app.use(morgan("dev"));


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// TODO VER BIEN ESTO DE SUSCRIPCIONES

// ROUTES --------------------------------------------------------------
app.use(router);

const ws = createServer(app);

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


// Utilizamos el middleware jwt para verificar tokens de autenticación en todas las rutas excepto en las que
// se encuentran en el objeto unless.
// TODO: CHANGE TO ENV VAR
app.use(jwt({ secret: "MAH2018!#" }).unless({ path: openRoutes }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

/* console.log(schema.getSubscriptionType().getFields().messageAdded) */

/* Middleware that allows HTTP methods other than GET and POST to be used in HTTP requests. */
app.use(methodOverride());

// Error handling
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
