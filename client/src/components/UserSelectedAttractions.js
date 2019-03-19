import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
// import { READ_BUSINESSES } from '../resolvers'

export const READ_ATTRACTIONS = gql`
  query {
    userSelectedAttractions @client {
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
// REVIEW: Have you heard of hooks?
export class UserSelectedAttractions extends Component {
  render() {
    return (
      <Query query={READ_ATTRACTIONS}>
        {({ data, loading, client, error }) => {
          if (loading) return <h2>Loading...</h2>
          if (error) return <p>ERROR: {error.message}</p>
          // console.log(client.cache)
          // console.log(data)
          return <h2>{data.userSelectedAttractions[0].name}</h2>
        }}
      </Query>
    )
  }
}

export default UserSelectedAttractions
