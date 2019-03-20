import gql from 'graphql-tag'
import UPDATE_SELECTED_BUSINESSES from './components/SingleBusiness'
// export const GET_CURRENT_TERM = gql`
//   query getCurrentTerm {
//     term @client
//   }
// `

export const typeDefs = gql`
  extend type Business {
    id: String
    rating: Float
    price: String
    name: String
    coordinates: Coordinates
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
  Query: {},

  Mutation: {
    updateTerm: (_, { term }, { cache }) => {
      const data = {
        term: term,
      }
      cache.writeData({ data })
      return data.term
    },
    allBusinesses: (_, { businesses }, { cache }) => {
      const data = {
        returnedBusinesses: businesses,
      }
      cache.writeData({ data })
      return data
    },
    updateSelectedBusinesses: (_, { business }, { cache }) => {
      const currentSelectedBusinesses = cache.readQuery({
        query: UPDATE_SELECTED_BUSINESSES,
      })
      const data = {
        userSelectedBusinesses: [...currentSelectedBusinesses, business],
      }

      cache.writeQuery({ query: UPDATE_SELECTED_BUSINESSES, data })
    },
  },
}
