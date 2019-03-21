import gql from 'graphql-tag'
import UPDATE_SELECTED_BUSINESSES from './components/SingleBusiness'
import { READ_YELP } from './components/YelpMain'

export const CALL_YELP = gql`
  query callYelp($latitude: Float!, $longitude: Float!, $term: String) {
    callYelp(latitude: $latitude, longitude: $longitude, term: $term) {
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
    callYelp: (_, { latitude, longitude, term }, { client }) => {
      const { data } = client.query({
        query: CALL_YELP,
        variables: { latitude, longitude, term }
      })
      client.writeData({
        id: 'businesses',
        data: data.callYelp.businesses
      })
      return data
    }
  },

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
    updateSelectedBusinesses: (_, { business }, { client }) => {
      console.log('hi')
      const currentSelectedBusinesses = client.readQuery({
        query: UPDATE_SELECTED_BUSINESSES
      })
      const data = {
        userSelectedBusinesses: [...currentSelectedBusinesses, business]
      }
      console.log('data', data)
      client.writeQuery({ query: UPDATE_SELECTED_BUSINESSES, data })
    }
  }
}
