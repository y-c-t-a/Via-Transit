import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import YelpAPI from './YelpAPI'
import YelpCategorySearch from './YelpCategorySearch'
import YelpPrice from './YelpPrice'
import YelpRadius from './YelpRadius'
import UserSelectedBusinesses from './UserSelectedBusinesses'

export const READ_YELP = gql`
  query {
    readYelp @client {
      startLat
      startLng
      term
      radius
      price
    }
  }
`

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

export default class YelpMain extends React.Component {
  render() {
    return (
      <div>
        <Query query={READ_YELP}>
          {({ loading: loadingOne, data: { readYelp } }) => (
            // console.log('readYelp', readYelp)
            <Query query={READ_ITINERARY}>
              {({ loading: loadingTwo, data: { userSelectedBusinesses }, client }) => {
                if (loadingOne || loadingTwo) return <span>loading...</span>
                return (
                  <div style={{ display: 'inline-block' }}>
                    <div style={{ float: 'right' }}>
                      <YelpCategorySearch />
                      <YelpPrice />
                      <YelpRadius />
                      <UserSelectedBusinesses client={client}/>
                    </div>
                    <div style={{ float: 'left' }}>
                      <YelpAPI
                        readYelp={readYelp}
                        readItinerary={userSelectedBusinesses}
                      />
                    </div>
                  </div>
                )
              }}
            </Query>
          )}
        </Query>
      </div>
    )
  }
}
