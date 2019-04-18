import * as queries from '../queries'

const defaults = {
  auth: {
    status: true,
    __typename: 'Auth',
  },
}

export default {
  defaults,
  resolvers: {
    Mutation: {
      setAuthStatus: (_, variables, { cache }) => {
        const previous = cache.readQuery({
          query: queries.auth.GET_AUTH_STATUS,
        })

        const data = {
          auth: {
            ...previous.auth,
            status: variables.status,
          },
        }
        cache.writeQuery({ query: queries.auth.GET_AUTH_STATUS, data })

        return data.auth
      },
    },
  },
}
