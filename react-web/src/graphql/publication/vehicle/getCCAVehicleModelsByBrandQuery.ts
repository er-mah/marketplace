import { gql } from "@apollo/client";

export const GET_VEHICLE_MODELS_BY_BRAND_QUERY = gql`
  query GetVehicleModelsByBrandName($brand: String!) {
    getVehicleModelsByBrandName(brand: $brand) {
      name
      id
    }
  }
`;
