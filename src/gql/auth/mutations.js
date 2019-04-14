import gql from 'graphql-tag'

export default {
  SET_AUTH_STATUS: gql`
    mutation SetAuthStatus($status: Boolean!) {
      setAuthStatus(status: $status) @client
    }
  `,
}
