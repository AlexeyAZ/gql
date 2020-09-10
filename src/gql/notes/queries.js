import gql from 'graphql-tag'

export default {
  GET_ALL_NOTES: gql`
    query {
      getAllPosts {
        _id
        title
        content
        createdAt
        author
      }
    }
  `,
}
