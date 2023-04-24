import { ApolloClient } from "@apollo/client";
import {cache} from "./apolloCache.ts";
import {authLink, httpLink} from "./apolloHttpLink.js";

/**
 * In this file it is contained apolloClient, the service that manages the requests to the GraphQL api.
 */


export const client = new ApolloClient({
  cache: cache,
  link: authLink(cache).concat(httpLink),
});

/*

// TODO: CHECK APOLLO sockets
// // import { split } from "apollo-link";
// // import { HttpLink } from "apollo-link-http";
// // import { WebSocketLink } from "apollo-link-ws";
// //import { getMainDefinition } from "apollo-utilities";
// //import { InMemoryCache } from "apollo-cache-inmemory";
// // import 'bootstrap';
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

 */
