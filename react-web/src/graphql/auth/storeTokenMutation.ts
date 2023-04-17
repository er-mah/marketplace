import {gql} from "@apollo/client";

export const STORE_TOKEN = gql`
    mutation StoreToken($token: String!) {
        storeToken(token: $token) @client
    }
`;