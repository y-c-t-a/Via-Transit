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
    uri: 'https://via-transit-server.herokuapp.com'
  }),
  resolvers,
  cache
})

// persistCache({
//   cache,
//   storage: window.localStorage
// })

window.addEventListener('load', e => {
  if (window.location.href.length > 45) {
    const currentURL = JSON.parse(
      base64.decode(window.location.pathname.slice(1))
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
      term: 'Coffee',
      radius: 5,
      price: '1'
    },
    userSelectedBusinesses: [
      {
        __typename: 'Business',
        id: 1,
        price: '$',
        name: 'Dollop',
        rating: 4,
        coordinates: {
          __typename: 'Coordinates',
          latitude: 41.8921475,
          longitude: -87.6191869
        }
      },
      {
        __typename: 'Business',
        id: 2,
        price: '$',
        name: 'Kung Fu Tea',
        rating: 3,
        coordinates: {
          __typename: 'Coordinates',
          latitude: 41.8542969,
          longitude: -87.6350943
        }
      },
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
      },
      {
        __typename: 'Business',
        id: 4,
        price: '$$',
        name: 'Wrigley Field',
        rating: 2.5,
        coordinates: {
          __typename: 'Coordinates',
          latitude: 41.9413393,
          longitude: -87.655412
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
