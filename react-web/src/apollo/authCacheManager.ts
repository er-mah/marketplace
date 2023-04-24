import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

import { GET_TOKEN_QUERY, STORE_TOKEN_MUTATION } from "../graphql/auth";

import { client } from "./index.ts";
import { ME_QUERY } from "../graphql/user";

export class AuthCacheManager {
  private client: ApolloClient<NormalizedCacheObject>;

  // Constructor method initializes Apollo client
  constructor() {
    this.client = client;
  }

  // Method to store token in cache
  async storeToken(token) {
    await this.client.mutate({
      mutation: STORE_TOKEN_MUTATION,
      variables: { token },
      update: async () => {
        const { cache } = this.client;

        // Update token value in cache
        await cache.writeQuery({
          query: GET_TOKEN_QUERY,
          data: {
            token: token,
          },
        });
      },
    });
  }

  // Method to retrieve token from cache
  async getToken() {
    const { data } = await this.client.query({ query: GET_TOKEN_QUERY });
    return data.token;
  }

  async fetchAndStoreUser() {

    const { data } = await this.client.query({
      query: ME_QUERY,
      fetchPolicy: 'no-cache',
    });

    return this.client.writeQuery({
      query: ME_QUERY,
      data: {
        me: await data.me,
      },
    });
  }

  async getLoggedUser() {
    const { me } = await this.client.readQuery({ query: ME_QUERY });
    return me;
  }
}
