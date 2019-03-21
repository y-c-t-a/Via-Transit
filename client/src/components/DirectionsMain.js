import React from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import DirectionsMap from './DirectionsMap'
import { Query } from 'react-apollo'

export const READ_ITINERARY = gql`
  query readItinerary {
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

export default class DirectionsMain extends React.Component {
  render() {
    return (
      <div>
        <Query query={READ_ITINERARY}>
          {({ data, loading, error }) => {
            if (loading) return <h2>Loading...</h2>
            if (error) return <p>ERROR: {error.message}</p>
            console.log('data', data.userSelectedBusinesses)
            return (
              <DirectionsMap
                id="directionsMap"
                userSelectedBusinesses={data.userSelectedBusinesses}
              />
            )
          }}
        </Query>
      </div>
    )
  }
}
