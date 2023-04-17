import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

import {GET_TOKEN} from "./getTokenQuery.ts";
import {STORE_TOKEN} from "./storeTokenMutation.ts";

import {client} from "../index.ts";
import {jwtUtils} from "../../utils/jwt.ts";

export class AuthCacheManager {
  private client: ApolloClient<NormalizedCacheObject>;

  constructor() {
    this.client = client;
  }

  async storeToken(token) {
    await this.client.mutate({
      mutation: STORE_TOKEN,
      variables: { token },
      update: async (cache) => {
        const isCurrentTokenExpired = await this.checkIfCurrentTokenExpired()

        if (isCurrentTokenExpired) {
          cache.writeQuery({
            query: GET_TOKEN,
            data: {
              token: token,
            },
          });
        }

      },
    });
  }

  async getToken() {
    const { data } = await this.client.query({ query: GET_TOKEN });
    return data.token;
  }

  // TODO: SAVE USER IN CACHE AND RETRIEVE IT
  /*
      writeUserData(user: User) {
          this.client.writeQuery({
              query: GET_USER_QUERY,
              data: {
                  user
              }
          });
      }
  
      readUserData(): User {
          const { user } = this.client.readQuery({ query: GET_USER_QUERY });
          return user;
      }
  
       */

  async checkIfCurrentTokenExpired() {
    return jwtUtils.isTokenExpired(await this.getToken())
  }
}
