import { createUploadLink } from 'apollo-upload-client'
import { ApolloClient, InMemoryCache, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'

import { serverURL } from '../config/config'
import { auth } from '../config/firebaseConfig'

const uploadLink = createUploadLink({
  uri: serverURL,
  headers: {
    'keep-alive': 'true',
  },
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(async ({ message, locations, path }) => {
      if (message === 'Not Authorized') {
        localStorage.removeItem('signedIn')

        await auth.signOut().catch((error) => {
          console.log(error)
        })
      }
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const client = new ApolloClient({
  link: from([authLink, errorLink, uploadLink]),
  cache: new InMemoryCache(),
})
