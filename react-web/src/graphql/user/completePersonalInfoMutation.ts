import { gql } from "@apollo/client";

// Query that helps return authenticated user's data
export const COMPLETE_PERSONAL_INFORMATION_MUTATION = gql`
  mutation CompletePersonalInformation($input: AdditionalUserDataInput!) {
    completePersonalInformation(input: $input) {
      id
      email
      first_name
      last_name
      address
      phone
      profile_image
      dni
      agency_id
      locality_id
      is_admin
      is_agency_representative
      is_email_verified
      is_account_disabled
    }
  }
`;
