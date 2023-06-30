import { gql } from "@apollo/client";

export const GET_VEHICLE_VERSIONS_BY_MODEL_QUERY = gql`
  query GetVehicleVersionsByYear($year: String!, $modelId: ID!) {
    getVehicleVersionsByYear(year: $year, modelId: $modelId) {
      id
      name
    }
  }
`;
