import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { GOOGLE_API_KEY } from '../secrets'

export const TEST_YELP = gql`
  query searchBusiness {
    searchBusinessTerm(
      latitude: 41.895546
      longitude: -87.638756
      term: "coffee"
    ) {
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

const mapStyles = {
  width: '100%',
  height: '100%'
}

class TestGoogle extends Component {
  render() {
    return (
      <div id="map">
        <Query query={TEST_YELP}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>{error}</p>
            return (
              <Map
                google={this.props.google}
                zoom={11}
                style={mapStyles}
                initialCenter={{
                  lat: 41.8781,
                  lng: -87.6298
                }}
              >
                {data.searchBusinessTerm.businesses &&
                  data.searchBusinessTerm.businesses.map((business, idx) => (
                    <Marker
                      key={idx}
                      title={business.name}
                      name={business.name}
                      position={{
                        lat: business.coordinates.latitude,
                        lng: business.coordinates.longitude
                      }}
                    />
                  ))}
              </Map>
            )
          }}
        </Query>
      </div>
    )
  }
}
export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(TestGoogle)
