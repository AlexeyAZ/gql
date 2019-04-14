import gql from 'graphql-tag'

export default {
  GET_WINDOWS_DATA: gql`
    query GetWindowsData {
      windows @client {
        sidebar
      }
    }
  `,
}
