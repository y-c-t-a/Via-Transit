import React from 'react'
import { Query } from 'react-apollo'
import YelpMap from './YelpMap'
import { CALL_YELP } from '../resolvers'

export default function YelpAPI(props) {
  const { startLat, startLng, term, price, radius } = props.readYelp
  const latitude = startLat
  const longitude = startLng
  return (
    <div>
      <Query query={CALL_YELP} variables={{ latitude, longitude, term, price, radius }}>
        {({ data, loading, error, client }) => {
          if (loading) return <h2>Loading...</h2>
          if (error) return <p>ERROR: {error.message}</p>

          console.log('YelpAPI rerender')

          return (
            <div>
              <YelpMap
                id="yelpMap"
                businesses={data.callYelp.businesses}
                client={client}
              />
            </div>
          )
        }}
      </Query>
    </div>
  )
}
