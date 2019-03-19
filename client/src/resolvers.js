import gql from 'graphql-tag'

// export const GET_CURRENT_TERM = gql`
//   query getCurrentTerm {
//     term @client
//   }
// `

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
      console.log('these are businesses --->', businesses)
      const data = {
        returnedBusinesses: businesses
      }
      console.log('this are data --->', data)
      cache.writeData({ data })
    }
  },
}
