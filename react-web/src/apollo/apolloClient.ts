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

// Obtener y guardar solo las partes necesarias de la caché en localStorage
const saveCacheState = () => {
  const cacheData = {
    ROOT_MUTATION: client.cache.extract().ROOT_MUTATION,
    ROOT_QUERY: {
      me: client.cache.extract().ROOT_QUERY?.me,
      token: client.cache.extract().ROOT_QUERY?.token,
    },
  };
  localStorage.setItem("cache", JSON.stringify(cacheData));
};

// Restaurar solo las partes necesarias de la caché desde localStorage
const restoreCacheState = () => {
  const cacheData = localStorage.getItem("cache");
  if (cacheData) {
    const parsedCacheData = JSON.parse(cacheData);
    client.cache.restore({
      ROOT_MUTATION: parsedCacheData.ROOT_MUTATION,
      ROOT_QUERY: parsedCacheData.ROOT_QUERY,
    });
  }
};

// Llamar a restoreCacheState al iniciar la aplicación
restoreCacheState();

// Registrar un evento para guardar el estado de la caché antes de recargar la página
window.addEventListener("beforeunload", saveCacheState);
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
