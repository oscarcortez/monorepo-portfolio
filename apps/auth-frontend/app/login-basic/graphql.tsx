import { gql } from '@apollo/client';

export const SIGNIN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      access_token
    }
  }
`;
