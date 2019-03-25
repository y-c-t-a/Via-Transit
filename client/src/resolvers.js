import gql from 'graphql-tag'
import { READ_YELP } from './components/YelpMain'
import base64 from 'base-64'

export const GET_BUSINESSES = gql`
  query getBusinesses {
    businesses @client {
      price
      name
      rating
      coordinates {
        latitude
        longitude
      }
    }
  }
`

export const updateURL = (itinerary) => {
  const encoded = base64.encode(JSON.stringify(itinerary))
  window.history.replaceState('', '', `http://localhost:3000/itinerary/${encoded}`)
}

export const resolvers = {
  Mutation: {
    updateTerm: (_, { term }, { client }) => {
      const { readYelp } = client.readQuery({
        query: READ_YELP
      })
      const data = {
        readYelp: { ...readYelp, term }
      }
      client.writeQuery({ query: READ_YELP, data })
      return data
    },
    updatePrice: (_, { price }, { client }) => {
      const { readYelp } = client.readQuery({
        query: READ_YELP
      })
      const data = {
        readYelp: { ...readYelp, price }
      }
      client.writeQuery({ query: READ_YELP, data })
      return data
    },
    updateRadius: (_, { radius }, { client }) => {
      const { readYelp } = client.readQuery({
        query: READ_YELP
      })
      const data = {
        readYelp: { ...readYelp, radius }
      }
      client.writeQuery({ query: READ_YELP, data })
      return data
    }
  }
}
