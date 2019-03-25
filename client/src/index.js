import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
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
    {/* <h3>Businesses Recommended by Yelp</h3> */}
    <Router>
      <div>
        <Menu>
          <Link to="/search">
            <Menu.Item
              name="search"
              // active={activeItem  === 'search'}
            />
          </Link>
          <Link to="/itinerary">
            <Menu.Item
              name="itinerary"
              // active={activeItem === 'itinerary'}
            />
          </Link>
        </Menu>
        <Route exact path="/" render={() => <Redirect to="/search" />} />
        <Route exact path="/search" component={YelpMain} />
        {/* <h3>Travel by CTA!</h3> */}
        <Route exact path="/itinerary" component={DirectionsMain} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
