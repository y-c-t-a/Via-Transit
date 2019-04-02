import React from 'react'
import ReactDOM from 'react-dom'
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect
// } from 'react-router-dom'
// import { Menu } from 'semantic-ui-react'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { READ_ITINERARY } from './components/Main'
import { resolvers } from './resolvers'
import base64 from 'base-64'
import Main from './components/Main'

const cache = new InMemoryCache()

const client = new ApolloClient({
  connectToDevTools: true,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql'
  }),
  resolvers,
  cache
})

persistCache({
  cache,
  storage: window.localStorage
})

window.addEventListener('load', e => {
  if (window.location.href.length > 40) {
    const currentURL = JSON.parse(
      base64.decode(window.location.pathname.slice(11))
    )
    client.writeQuery({
      query: READ_ITINERARY,
      data: {
        userSelectedBusinesses: currentURL
      }
    })
  }
})

cache.writeData({
  data: {
    readYelp: {
      __typename: 'readYelp',
      startLat: 41.8838,
      startLng: -87.625,
      term: '',
      radius: 10,
      price: '1'
    },
    userSelectedBusinesses: [
      {
        __typename: 'Business',
        id: 3,
        price: '$$',
        name: 'United Center',
        rating: 2.5,
        coordinates: {
          __typename: 'Coordinates',
          latitude: 41.8806908,
          longitude: -87.6763646
        }
      }
    ]
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Main />
  </ApolloProvider>,
  document.getElementById('root')
)
