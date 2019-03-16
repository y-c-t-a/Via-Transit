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
              lat
              lng
            }
            end_location {
              lat
              lng
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
                  lat
                  lng
                }
              }
              departure_stop {
                name
                location {
                  lat
                  lng
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
            lng
            lat
          }
          northeast {
            lng
            lat
          }
        }
      }
    }
  }
`

export default function TestGoogleQuery() {
  return (
    <div>
      <Query query={TEST_GOOGLE}>
        {({ data, loading, error }) => {
          console.log(data)
          if (loading) return <p>Loading...</p>
          if (error) return <p>oh noes</p>
          return (
            <div>
              <p>{data.getDirections.routes[0].summary}</p>
            </div>
          )
        }}
      </Query>
    </div>
  )
}
