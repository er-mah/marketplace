import { gql } from "@apollo/client";

// Query that helps return authenticated user's data
export const CREATE_AGENCY_MUTATION = gql`
  mutation CreateAgency($input: NewAgencyInput) {
    createAgency(input: $input) {
      id
      name
      email
      phone
      address
      locality_id
      zip_code
      representatives {
        id
        email
      }
      bannerImage
    }
  }
`;
