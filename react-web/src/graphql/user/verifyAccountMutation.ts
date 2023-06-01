import { gql } from "@apollo/client";

export const VERIFY_ACCOUNT_MUTATION = gql`

  mutation VerifyAccount($verificationToken: String!) {
    verifyAccount(verification_token: $verificationToken) {
      id
      email
      first_name
      last_name
    }
  }
  
`;


