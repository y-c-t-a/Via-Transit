import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import TestGoogle from './components/GoogleTest'
import TestYelp from './components/YelpTest'
import dotenv from 'dotenv'
import GoogleTest from './components/GoogleTest'
import TestGoogleQuery from './components/TestGoogleQuery'
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
    {/* <TestGoogleQuery /> */}
    {/* <TestYelp /> */}
    <TestGoogle />
  </ApolloProvider>,
  document.getElementById('root')
)
