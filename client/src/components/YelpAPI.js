import React from 'react'
import { Query } from 'react-apollo'
import YelpMap from './YelpMap'
import gql from 'graphql-tag'

export const CALL_YELP = gql`
  query callYelp(
    $latitude: Float!
    $longitude: Float!
    $term: String
    $price: String
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

export default class YelpAPI extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.readItinerary.length !== nextProps.readItinerary.length) {
      return false
    }
    return true
  }

  render() {
    const { term, price, radius } = this.props.readYelp
    const { latitude, longitude } = this.props.readItinerary[
      this.props.readItinerary.length - 1
    ].coordinates
    return (
      <div>
        <Query
          query={CALL_YELP}
          variables={{ latitude, longitude, term, price, radius }}
        >
          {({ data, client }) => {
            return (
              <div>
                <YelpMap
                  id="yelpMap"
                  businesses={data.callYelp ? data.callYelp.businesses : []}
                  client={client}
                  userSelectedBusinesses={this.props.readItinerary}
                  radius={radius}
                />
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}
