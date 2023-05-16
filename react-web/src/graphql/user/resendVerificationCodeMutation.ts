import { gql } from "@apollo/client";

export const RESEND_ACCOUNT_VERIFICATION_CODE_MUTATION = gql`

  mutation ResendAccountVerificationCode($email: String!) {
    resendAccountVerificationCode(email: $email)
  }
`;


