import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

export const READ_BUSINESSES = gql`
  query {
    userSelectedBusinesses @client {
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

export class UserSelectedBusinesses extends Component {
  render() {
    return (
      <Query query={READ_BUSINESSES}>
        {({ data, loading, client, error }) => {
          if (loading) return <h2>Loading...</h2>
          if (error) return <p>ERROR: {error.message}</p>
          // console.log(client.cache)
          // console.log(data)
          // return <h2>{data.UserSelectedBusinesseses[0].name}</h2>
        }}
      </Query>
    )
  }
}

export default UserSelectedBusinesses
