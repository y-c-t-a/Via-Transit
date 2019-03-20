import gql from 'graphql-tag'
import UPDATE_SELECTED_BUSINESSES from './components/SingleBusiness'

// export const typeDefs = gql`
//   extend type Business {
//     id: String
//     rating: Float
//     price: String
//     name: String
//     coordinates: Coordinates
//   }
// `

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

export const ALL_BUSINESSES = gql`
  mutation allBusinesses($businesses: [Business]) {
    allBusinesses(businesses: $businesses) @client {
      returnedBusinesses
    }
  }
`
export const resolvers = {
  Query: {
    callYelp: (_, { latitude, longitude, term }, { cache }) => {
      console.log('this is the resolver')
      const { data } = cache.query({
        query: CALL_YELP,
        variables: { latitude, longitude, term }
      })
      cache.writeData({
        id: 'returnedBusinesses',
        data: data.callYelp.businesses
      })
      return data
    }
  },

  Mutation: {
    updateTerm: (_, { term }, { cache }) => {
      const data = {
        term: term
      }
      cache.writeData({ data })
      return data.term
    },
    allBusinesses: (_, { businesses }, { cache }) => {
      const data = {
        returnedBusinesses: businesses
      }
      cache.writeData({ data })
      return data
    },
    updateSelectedBusinesses: (_, { business }, { cache }) => {
      const currentSelectedBusinesses = cache.readQuery({
        query: UPDATE_SELECTED_BUSINESSES
      })
      const data = {
        userSelectedBusinesses: [...currentSelectedBusinesses, business]
      }

      cache.writeQuery({ query: UPDATE_SELECTED_BUSINESSES, data })
    }
  }
}
