import gql from 'graphql-tag'

export default {
  CREATE_USER: gql`
    mutation CreateUser($firstName: String!, $email: String!, $password: String!) {
      createUser(firstName: $firstName, email: $email, password: $password) {
        firstName
        token
        _id
      }
    }
  `,
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        firstName
        token
        _id
      }
    }
  `,
}
