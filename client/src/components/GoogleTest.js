import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import dotenv from 'dotenv'
import { GOOGLE_API_KEY } from '../secrets'

export const TEST_GOOGLE = gql`
  query {
    getDirections(
      originLatitude: 41.895541
      originLongitude: -87.639220
      destinationLatitude: 41.8902842
      destinationLongitude: -87.6440364
    ) {
      routes {
        summary
        legs {
          steps {
            travel_mode
            start_location {
              latitude
              longitude
            }
            end_location {
              latitude
              longitude
            }
            # polyline {points}
            duration {
              value
              text
            }
            html_instructions
            distance {
              value
              text
            }
            transit_details {
              arrival_stop {
                name
                location {
                  latitude
                  longitude
                }
              }
              departure_stop {
                name
                location {
                  latitude
                  longitude
                }
              }
              headway
              num_stops
              line {
                name
                short_name
                color
                icon
                vehicle {
                  name
                  type
                  icon
                  local_icon
                }
              }
            }
          }
          duration {
            value
            text
          }
          distance {
            value
            text
          }
        }
        # overview_polyline
        fare {
          currency
          value
          text
        }
        bounds {
          southwest {
            longitude
            latitude
          }
          northeast {
            longitude
            latitude
          }
        }
      }
    }
  }
`

const mapStyles = {
  width: '100%',
  height: '100%',
}

export class TestGoogle extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={11}
        style={mapStyles}
        initialCenter={{
          lat: 41.8781,
          lng: -87.6298,
        }}
      />
    )
  }
}
export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY,
})(TestGoogle)

// export default function TestGoogle() {
//   return (
//     <div>
//       <Query query={TEST_GOOGLE}>
//         {({ data, loading, error }) => {
//           console.log(data)
//           if (loading) return <p>Loading...</p>
//           if (error) return <p>oh noes</p>
//           return (
//             <div>
//               <p>hey</p>
//             </div>
//           )
//         }}
//       </Query>
//     </div>
//   )
// }
