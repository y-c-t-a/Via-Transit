import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import YelpCategorySearch from './components/YelpCategorySearch'
import Map from './components/Map'
import {resolvers} from './resolvers'

const cache = new InMemoryCache()
cache.writeData({
  data: {
    latitude: 41.8955,
    longitude: -87.6392,
    term: ''
  }
})

const client = new ApolloClient({
  connectToDevTools: true,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
  resolvers,
  cache
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Map id="map" />
    <YelpCategorySearch />
  </ApolloProvider>,
  document.getElementById('root')
)
