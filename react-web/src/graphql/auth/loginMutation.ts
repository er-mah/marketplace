import {gql} from "@apollo/client";

export const LOGIN_MUTATION = gql`#graphql
    
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            token
        }
    }
`;
