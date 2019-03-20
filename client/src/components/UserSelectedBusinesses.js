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
<<<<<<< HEAD:client/src/components/UserSelectedBusinesses.js
          return <h2>hey</h2>
=======
          return <h2>{data.UserSelectedBusinesseses[0].name}</h2>
>>>>>>> c0b2e503fdb243b07b843d4cd9fc2f0e74cf9c15:client/src/components/UserSelectedBusinesses.js
        }}
      </Query>
    )
  }
}

export default UserSelectedBusinesses
