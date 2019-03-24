import gql from 'graphql-tag'
import { READ_YELP } from './components/YelpMain'

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
      console.log('new data to cache', data)
      client.writeQuery({ query: READ_YELP, data })
      return data
    }
  }
}
