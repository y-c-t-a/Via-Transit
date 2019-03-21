import gql from 'graphql-tag'
import UPDATE_SELECTED_BUSINESSES from './components/SingleBusiness'
import { READ_YELP } from './components/YelpMain'

export const CALL_YELP = gql`
  query callYelp(
    $latitude: Float!
    $longitude: Float!
    $term: String
    $price: Int
    $radius: Int
  ) {
    callYelp(
      latitude: $latitude
      longitude: $longitude
      term: $term
      price: $price
      radius: $radius
    ) {
      businesses {
        id
        price
        name
        rating
        coordinates {
          latitude
          longitude
        }
      }
    }
  }
`

export const resolvers = {
  Query: {
    callYelp: (_, { latitude, longitude, term, price, radius }, { client }) => {
      const { data } = client.query({
        query: CALL_YELP,
        variables: { latitude, longitude, term, price, radius }
      })
      client.writeData({
        id: 'businesses',
        data: data.callYelp.businesses,
      })
      return data
    },
  },

  Mutation: {
    updateTerm: (_, { term }, { client }) => {
      const { readYelp } = client.readQuery({
        query: READ_YELP,
      })
      const data = {
        readYelp: { ...readYelp, term },
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
    },
  },
}
