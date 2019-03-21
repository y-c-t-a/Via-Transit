import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import YelpAPI from './YelpAPI'
import YelpCategorySearch from './YelpCategorySearch'
import { Button } from 'semantic-ui-react'

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
        <Query query={READ_YELP} notifyOnNetworkStatusChange>
          {({ data, loading, error, refetch, networkStatus }) => {
            if (networkStatus === 4) return 'Refreshing!'
            if (loading) return <h2>Loading...</h2>
            if (error) return <p>ERROR: {error.message}</p>
            return (
              <div>
                <h2>{data.readYelp.startLat}</h2>
                <YelpAPI readYelp={data.readYelp} />
                <YelpCategorySearch />
                <Button onClick={() => refetch()}>Search!</Button>
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}
