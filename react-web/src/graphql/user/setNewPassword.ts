import { gql } from "@apollo/client";

export const SET_NEW_PASSWORD_MUTATION = gql`
  mutation SetNewPassword(
    $recoveryToken: String!
    $password: String!
    $repeatPassword: String!
  ) {
    setNewPassword(
      recovery_token: $recoveryToken
      password: $password
      repeat_password: $repeatPassword
    ) {
      id
      first_name
      last_name
      email
    }
  }
`;
