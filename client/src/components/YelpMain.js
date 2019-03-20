import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import YelpAPI from './YelpAPI'

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
  constructor(props) {
    super(props)
    this.state = {
      startLat: 41.8955,
      startLng: -87.6392,
      term: 'flooblar',
      radius: 3,
      rating: 4.8,
      price: '$$'
    }
  }
  render() {
    return (
      <div>
        <Query query={READ_YELP}>
          {({ data, loading, client, error }) => {
            if (loading) return <h2>Loading...</h2>
            if (error) return <p>ERROR: {error.message}</p>

            return <h2>{data.readYelp.term}</h2>
          }}
        </Query>
        <YelpAPI state={this.state} />
      </div>
    )
  }
}
