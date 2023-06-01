import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GET_TOKEN_QUERY } from "../graphql/auth";

const GRAPHQL_API_URI = process.env.REACT_APP_GRAPHQL_API_URI;

/**
 * This function called authLink takes the Apollo Client cache as an argument and returns
 * a new Apollo Client link configuration object that adds the token in the authorization header
 *
 * When GraphQL requests are made with Apollo Client, the cached token will be automatically
 * added to the authorization header.
 */

export const httpLink = new HttpLink({
  uri: `${GRAPHQL_API_URI}`,
});



export const authLink = (cache) => {
  return setContext((_, { headers }) => {
    // get the authentication token from cache if it exists
    const token = cache.readQuery({
      query: GET_TOKEN_QUERY,
    })?.token;


    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },

    };
  });
};
