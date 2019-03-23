import React from 'react'
import { Query } from 'react-apollo'
import YelpMap from './YelpMap'
import gql from 'graphql-tag'
// import { CALL_YELP } from '../resolvers'

export const CALL_YELP = gql`
  query callYelp(
    $latitude: Float!
    $longitude: Float!
    $term: String
    $price: Int
    $radius: Int
  ) {
    callYelp(
      latitude: $latitude
      longitude: $longitude
      term: $term
      price: $price
      radius: $radius
    ) {
      businesses {
        id
        price
        name
        rating
        coordinates {
          latitude
          longitude
        }
      }
    }
  }
`

export default function YelpAPI(props) {
  const { startLat, startLng, term, price, radius } = props.readYelp
  const latitude = startLat
  const longitude = startLng
  return (
    <div>
      <Query
        query={CALL_YELP}
        variables={{ latitude, longitude, term, price, radius }}
      >
        {({ data, loading, error, client }) => {
          // if (loading) return <h2>Loading...</h2>
          // if (error) return <p>ERROR: {error.message}</p>
          // console.log('re-rendering YelpAPI')
          return (
            <div>
              <YelpMap
                id="yelpMap"
                businesses={data.callYelp ? data.callYelp.businesses : []}
                client={client}
              />
            </div>
          )
        }}
      </Query>
    </div>
  )
}
