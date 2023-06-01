import {gql} from "@apollo/client";

export const STORE_TOKEN_MUTATION = gql`
    mutation StoreToken($token: String!) {
        storeToken(token: $token) @client
    }
`;