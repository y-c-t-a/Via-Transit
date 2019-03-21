import React from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import DirectionsMap from './DirectionsMap'
import { Query } from 'react-apollo'
import UserSelectedBusinesses from './UserSelectedBusinesses'

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
          {({ data, loading, error, client }) => {
            if (loading) return <h2>Loading...</h2>
            if (error) return <p>ERROR: {error.message}</p>
            return (
              <div style={{ display: 'inline-block' }}>
                <div style={{ float: 'left' }}>
                  <DirectionsMap
                    id="directionsMap"
                    userSelectedBusinesses={data.userSelectedBusinesses}
                  />
                </div>
                <div style={{ float: 'right' }}>
                  <UserSelectedBusinesses client={client} />
                </div>
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}
