/* eslint react/jsx-filename-extension: 0 */

import React from "react";
import { render } from "react-snapshot";

import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";
// import 'bootstrap';
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API}/graphql`,
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_SOCKET,
  options: {
    reconnect: true,
    noServer: true,
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

// TODO: CHECK APOLLO CLIENT
const client = new ApolloClient({
  link,
  cache,
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
