const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    searchBusinessTerm(latitude: Float!, longitude: Float!, term: String): Businesses
  }

  type Businesses {
    businesses: [Business]
  }

  type Business {
    rating: Float
    price: String
    name: String
    coordinates: Coordinates
  }

  type Coordinates {
    latitude: Float
    longitude: Float
  }
`;
module.exports = typeDefs
