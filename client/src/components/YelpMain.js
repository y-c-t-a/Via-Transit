import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import YelpAPI from './YelpAPI'
import YelpCategorySearch from './YelpCategorySearch'
import YelpPrice from './YelpPrice'
import YelpRadius from './YelpRadius'

export const READ_YELP = gql`
  query {
    readYelp @client {
      startLat
      startLng
      term
      radius
      rating
      price
    }
  }
`

export default class YelpMain extends React.Component {
  render() {
    return (
      <div>
        <Query query={READ_YELP}>
          {({ data, loading, error }) => {
            if (loading) return <h2>Loading...</h2>
            if (error) return <p>ERROR: {error.message}</p>
            return (
              <div style={{ display: 'inline-block' }}>
                <div style={{ float: 'right' }}>
                  <YelpCategorySearch />
                  <YelpPrice />
                  <YelpRadius />
                </div>
                <div style={{ float: 'left' }}>
                  <YelpAPI readYelp={data.readYelp} />
                </div>
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}
