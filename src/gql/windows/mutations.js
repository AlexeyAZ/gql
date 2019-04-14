import gql from 'graphql-tag'

export default {
  SWITCH_SIDEBAR: gql`
    mutation SwitchSidebar($sidebar: Boolean!) {
      switchSidebar(sidebar: $sidebar) @client
    }
  `,
  SHOW_SIDEBAR: gql`
    mutation ShowSidebar {
      showSidebar @client
    }
  `,
  HIDE_SIDEBAR: gql`
    mutation HideSidebar {
      hideSidebar @client
    }
  `,
}
