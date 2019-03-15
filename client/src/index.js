import React from 'react'
import ReactDOM from 'react-dom'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {ApolloProvider} from 'react-apollo'
import {InMemoryCache} from 'apollo-cache-inmemory';
import Test from './components/YelpTest'
// import {resolvers, typeDefs} from './resolvers'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: "include",
  headers: {
    authorization: process.env.YELP_API_KEY ? `Bearer ${process.env.YELP_API_KEY}` : "",
    'Content-Type': 'application/graphql'
  },
  fetchOptions: {
    mode: 'no-cors',
    credentials: 'include'
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Test />
  </ApolloProvider>,
  document.getElementById('root')
);
