import * as queries from '../queries'

const defaults = {
  windows: {
    sidebar: true,
    __typename: 'Windows',
  },
}

export default {
  defaults,
  resolvers: {
    Mutation: {
      switchSidebar: (_, variables, { cache }) => {
        const previous = cache.readQuery({
          query: queries.windows.GET_WINDOWS_DATA,
        })

        const data = {
          windows: {
            ...previous.windows,
            sidebar: !previous.windows.sidebar,
          },
        }
        cache.writeQuery({ query: queries.windows.GET_WINDOWS_DATA, data })

        return data.windows
      },
      showSidebar: (_, variables, { cache }) => {
        const previous = cache.readQuery({
          query: queries.windows.GET_WINDOWS_DATA,
        })

        const data = {
          windows: {
            ...previous.windows,
            sidebar: true,
          },
        }
        cache.writeQuery({ query: queries.windows.GET_WINDOWS_DATA, data })

        return data.windows
      },
      hideSidebar: (_, variables, { cache }) => {
        const previous = cache.readQuery({
          query: queries.windows.GET_WINDOWS_DATA,
        })

        const data = {
          windows: {
            ...previous.windows,
            sidebar: false,
          },
        }
        cache.writeQuery({ query: queries.windows.GET_WINDOWS_DATA, data })

        return data.windows
      },
    },
  },
}
