import {gql} from "@apollo/client";

// Query that helps return authenticated user's data
export const SEARCH_AGENCIES_BY_NAME_QUERY = gql`
    query SearchAgencies($query: String!) {
        searchAgencies(query: $query) {
            id
            name
        }
    }
`