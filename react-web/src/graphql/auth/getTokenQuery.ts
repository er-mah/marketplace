import {gql} from "@apollo/client";

export const GET_TOKEN_QUERY = gql`
    query GetToken {
        token @client
    }
`;