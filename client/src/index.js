import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import TestGoogle from './components/GoogleTest'
import dotenv from 'dotenv'
// import {resolvers, typeDefs} from './resolvers'
dotenv.config()
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {},
  }),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <TestGoogle />
  </ApolloProvider>,
  document.getElementById('root')
)
