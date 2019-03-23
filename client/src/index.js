import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import DirectionsMain from './components/DirectionsMain'
import { resolvers } from './resolvers'
import YelpMain from './components/YelpMain'

const cache = new InMemoryCache()

persistCache({
  cache,
  storage: window.localStorage
})

cache.writeData({
  data: {
    readYelp: {
      __typename: 'readYelp',
      startLat: 41.8956,
      startLng: -87.6393,
      term: 'Coffee',
      radius: 3,
      rating: 4.8,
      price: 4
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
          latitude: 41.8938478,
          longitude: -87.6361254
        }
      },
      {
        __typename: 'Business',
        id: 2,
        price: '$$$',
        name: 'REI',
        rating: 3,
        coordinates: {
          __typename: 'Coordinates',
          latitude: 41.9082438,
          longitude: -87.6492494
        }
      },
      {
        __typename: 'Business',
        id: 3,
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
    // businesses: [
    //   {
    //     __typename: 'Business'
    //   }
    // ]
  }
})

const client = new ApolloClient({
  connectToDevTools: true,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql'
  }),
  resolvers,
  cache
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <h3>Businesses Recommended by Yelp</h3>
    <YelpMain />
    <h3>Travel by CTA!</h3>
    <DirectionsMain />
  </ApolloProvider>,
  document.getElementById('root')
)
