import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`

  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
      email
      first_name
      last_name
    }
  }
`;
