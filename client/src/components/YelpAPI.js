import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const CALL_YELP = gql`
  query callYelp($latitude: Float!, $longitude: Float!, $term: String) {
    callYelp(latitude: $latitude, longitude: $longitude, term: $term) {
      businesses {
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

export default class YelpAPI extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // console.log('props', this.props.state)
    const state = this.props.state
    console.log('state', state)
    console.log('coord', state.coordinates)
    const { price, name, rating } = state
    const { startLat, startLng } = state
    const latitude = startLat,
      longitude = startLng
    return (
      <Query
        query={CALL_YELP}
        variables={{ price, name, rating, latitude, longitude }}
      >
        {({ data, loading, client, error }) => {
          if (loading) return <h2>Loading...</h2>
          if (error) return <p>ERROR: {error.message}</p>
          // console.log(client.cache)
          console.log(data)
          return <h2>{data.callYelp.businesses[1].name}</h2>
        }}
      </Query>
    )
  }
}
