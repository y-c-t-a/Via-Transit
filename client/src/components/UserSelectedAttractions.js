import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
// import { READ_BUSINESSES } from '../resolvers'

export const READ_BUSINESSES = gql`
  query readBusinesses {
    latitude @client
  }
`

export class UserSelectedAttractions extends Component {
  render() {
    return (
      <Query query={READ_BUSINESSES}>
        {({ data, loading, client, error }) => {
          if (loading) return <h2>Loading...</h2>
          if (error) return <p>ERROR: {error.message}</p>
          console.log(client.cache)
          return <h2>Hey girl hey</h2>
        }}
      </Query>
    )
  }
}

export default UserSelectedAttractions
