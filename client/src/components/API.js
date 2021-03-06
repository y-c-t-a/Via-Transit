import React from 'react'
import { Query } from 'react-apollo'
import Map from './Map'
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

export default class API extends React.Component {
  // shouldComponentUpdate(nextProps) {
  //   if (this.props.readItinerary.length !== nextProps.readItinerary.length) {
  //     return false
  //   }
  //   return true
  // }

  render() {
    const { term, price, radius } = this.props.readYelp
    let latitude
    let longitude
    if (this.props.readItinerary.length) {
      latitude = this.props.readItinerary[this.props.readItinerary.length - 1]
        .coordinates.latitude
      longitude = this.props.readItinerary[this.props.readItinerary.length - 1]
        .coordinates.longitude
    } else {
      latitude = 41.883498
      longitude = -87.624951
    }
    return (
      <Query
        query={CALL_YELP}
        variables={{ latitude, longitude, term, price, radius }}
      >
        {({ data, client }) => {
          return (
            <Map
              style={{ width: '100%', height: '100%' }}
              businesses={data.callYelp ? data.callYelp.businesses : []}
              client={client}
              userSelectedBusinesses={this.props.readItinerary}
              radius={radius}
            />
          )
        }}
      </Query>
    )
  }
}
