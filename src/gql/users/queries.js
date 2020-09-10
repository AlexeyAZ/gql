import gql from 'graphql-tag'

export default {
  GET_ALL_USERS: gql`
    query GET_ALL_USERS {
      getAllUsers {
        _id
        firstName
        lastName
        password
        email
        token
        role
      }
    }
  `,
  LOGIN_USER: gql`
    query($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        firstName
        token
        _id
      }
    }
  `,
  GET_USER: gql`
    query GET_USER($id: String!) {
      getUser(_id: $id) {
        email
        firstName
        lastName
        posts {
          _id
          title
          content
          createdAt
          updatedAt
        }
      }
    }
  `,
}
