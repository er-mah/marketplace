import { gql } from "@apollo/client";

export const GET_VEHICLE_BRANDS_QUERY = gql`
  query GetVehicleBrands {
    getVehicleBrands {
      id
      name
    }
  }
`;
