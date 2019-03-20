import React from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { ALL_BUSINESSES } from '../resolvers'

export const CALL_YELP = gql`
  query callYelp($latitude: Float!, $longitude: Float!, $term: String) {
    callYelp(latitude: $latitude, longitude: $longitude, term: $term) {
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

export default class YelpAPI extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const state = this.props.state
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

          // return client.cache.writeData({ data: data.callYelp.businesses })

          return (
            <Mutation mutation={ALL_BUSINESSES}>
              {allBusinesses => {
                allBusinesses({
                  variables: { businesses: data.callYelp.businesses }
                })
                return null
              }}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}
