import { gql } from "@apollo/client";

export const GET_VEHICLE_YEARS_BY_MODEL_QUERY = gql`
  query GetVehicleYearsByModelID($modelId: ID!) {
    getVehicleYearsByModelID(modelId: $modelId) {
      id
      name
    }
  }
`;
