import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation createUser($data: UserCreateInput!) {
    createUser(data: $data) {
      uuid
      createdAt
    }
  }
`;
