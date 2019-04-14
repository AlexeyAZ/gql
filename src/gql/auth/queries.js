import gql from 'graphql-tag'

export default {
  GET_AUTH_STATUS: gql`
    query {
      auth @client {
        status
      }
    }
  `,
}
