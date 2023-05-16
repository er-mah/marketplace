import { gql } from "@apollo/client";

// Query that helps return authenticated user's data
export const GET_LOCALITIES_BY_DEPARTMENT_QUERY = gql`
  query GetLocalitiesByDepartmentId($departmentId: ID!) {
    getLocalitiesByDepartmentId(id: $departmentId) {
      id
      name
      latitude
      longitude
    }
  }
`;
