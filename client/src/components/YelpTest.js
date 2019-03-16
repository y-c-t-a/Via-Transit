import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

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

export default function Test() {
  return (
    <div>
      <Query query={TEST_YELP}>
        {({ data, loading, error }) => {
          console.log(data)
          if (loading) return <p>Loading...</p>
          if (error) return <p>{error}</p>
          return (
            <div>
              <h1>{data.searchBusinessTerm.businesses[0].name}</h1>
            </div>
          )
        }}
      </Query>
    </div>
  )
}
