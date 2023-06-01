import { gql } from "@apollo/client";

export const SEND_PASSWORD_RECOVERY_MUTATION = gql`
  
  mutation SendPasswordRecoveryEmail($email: String!) {
    sendPasswordRecoveryEmail(email: $email)
  }
  
`;


