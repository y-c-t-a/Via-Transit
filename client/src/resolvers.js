import gql from 'graphql-tag';

export const GET_CURRENT_TERM = gql`
  query getCurrentTerm {
    term @client
  }
`;

export const resolvers = {

  Mutation: {
    updateTerm: (_, { term }, { cache }) => {
      const data = {
        term: term
      }
     cache.writeData({data})
      return data.term
    }
  }
}
