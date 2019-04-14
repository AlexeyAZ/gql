import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink, Observable } from 'apollo-link'

import merge from 'lodash/merge'

import * as resolvers from './resolvers'
import * as queries from './queries'
import * as mutations from './mutations'

import { auth } from '../helpers'
import { history } from '../config'

const { getAuthToken } = auth
const cache = new InMemoryCache()

const request = async operation => {
  const token = await getAuthToken()
  operation.setContext({
    headers: {
      authorization: token,
    },
  })
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    })
)

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(gqlError => {
      console.log('gqlError', gqlError)
      if (gqlError.graphQLErrors) {
        for (let err of gqlError.graphQLErrors) {
          switch (err.extensions.code) {
            case 'UNAUTHENTICATED': {
              // history.push('/login')
              // client.query({
              //   query: queries.auth.GET_AUTH_STATUS,
              //   // variables: {
              //   //   auth: false
              //   // }
              // })
              //   .then(result => {console.log(result)})
              client.mutate({
                mutation: mutations.auth.SET_AUTH_STATUS,
                variables: {
                  status: false,
                },
                update: (cache, data) => {
                  console.log(gqlError)
                  console.log(data)
                  // const { todos } = cache.readQuery({ query: GET_TODOS });
                  // cache.writeQuery({
                  //   query: GET_TODOS,
                  //   data: { todos: todos.concat([addTodo]) },
                  // });
                  // console.log(cache)
                  // console.log(data)
                },
              })
              // .then(result => console.log(result))
              // console.log('UNAUTHENTICATED')
              break
            }
            default: {
              // console.log('error')
            }
          }
        }
        // graphQLErrors.map(({ message, locations, path }) =>
        //   console.log(
        //     `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        //   ),
        // );
      }
      if (gqlError.networkError) console.log(`[Network error]: ${gqlError.networkError}`)
    }),
    requestLink,
    new HttpLink({
      uri: 'http://localhost:5000/graphql',
      credentials: 'include',
    }),
  ]),
  cache,
  resolvers: { ...merge(...Object.values(resolvers)) }.resolvers,
})
// client.watchQuery({
//   query: queries.auth.GET_AUTH_STATUS
// })
//   .subscribe(result => {
//     console.log(result)
//     // const sitedata: any = result.data;
//     // this.sites = sitedata.cmp_site;
//     // this.loading = result.loading;
//     // this.error = result.errors;
//   })
cache.writeData({
  data: { ...merge(...Object.values(resolvers)) }.defaults,
})

export default client
