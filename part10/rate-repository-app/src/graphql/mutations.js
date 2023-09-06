import { gql } from "@apollo/client";

export const AUTHORIZE = gql`
  mutation authorize($credentials: AuthorizeInput) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;