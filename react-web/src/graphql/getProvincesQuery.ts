import {gql} from "@apollo/client";

// Query that helps return authenticated user's data
export const GET_PROVINCES_QUERY = gql`
    query GetAllProvinces {
        getAllProvinces {
            id
            name
        }
    }
`