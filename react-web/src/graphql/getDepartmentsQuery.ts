import {gql} from "@apollo/client";

// Query that helps return authenticated user's data
export const GET_DEPARTMENTS_BY_PROVINCE_QUERY = gql`
    query GetDepartmentsByProvinceId($provinceId: ID!) {
        getDepartmentsByProvinceId(id: $provinceId) {
            id
            name
        }
    }
`