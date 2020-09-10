import gql from 'graphql-tag'

export default {
  CREATE_NOTE: gql`
    mutation CreateNote($title: String!, $content: String!, $userId: String!) {
      createPost(title: $title, content: $content, userId: $userId) {
        _id
        title
        content
        createdAt
        author
      }
    }
  `,
  UPDATE_NOTE: gql`
    mutation UpdateNote(
      $title: String
      $content: String
      $postId: String!
      $localUpdatedAt: String!
    ) {
      updatePost(
        title: $title
        content: $content
        postId: $postId
        localUpdatedAt: $localUpdatedAt
      ) {
        _id
        title
        content
        createdAt
        author
      }
    }
  `,
  UPDATE_NOTES: gql`
    mutation UpdateNotes($userId: String!, $posts: [MainPost]!) {
      updatePosts(userId: $userId, posts: $posts) {
        _id
        title
        content
        createdAt
        updatedAt
        author
      }
    }
  `,
  DELETE_NOTE: gql`
    mutation DeleteNote($id: String!) {
      deletePost(id: $id) {
        _id
        title
        content
        createdAt
        author
      }
    }
  `,
}
