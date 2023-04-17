import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";



/**
 *  La creación del cliente de Apollo se puede realizar en un archivo separado en la carpeta graphql, por
 *  ejemplo en un archivo llamado client.js.
 *
 *  -- Podemos crear httpLink y el cliente de apollo
 */



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





const GRAPHQL_API_URI = process.env.REACT_APP_GRAPHQL_API_URI;

// Set apollo client to point at the server we've created
export const cache = new InMemoryCache();

export const httpLink = new HttpLink({
    uri: `${GRAPHQL_API_URI}`,
});

export const client = new ApolloClient({
    cache: cache,
    link: httpLink,
});