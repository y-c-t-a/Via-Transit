import React from 'react'
import { Query, ApolloConsumer } from 'react-apollo'
import { Select } from 'semantic-ui-react'
import gql from 'graphql-tag'

export const YELP_CATEGORY_SEARCH = gql`
  query searchBusiness($latitude: Float!, $longitude: Float!, $term: String) {
    searchBusinessTerm(
      latitude: $latitude
      longitude: $longitude
      term: $term
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

const attractions = ['Restaurants', 'Breakfast & Brunch', 'Coffee & Tea']

export default class YelpCategorySearch extends React.Component {
  // constructor(props) {
  //   super(props)

  // const query = gql`
  //   query getCache {
  //     data @client {
  //       latitude
  //       longitude
  //       term
  //     }
  //   }
  // `
  // const yelpInfo = this.props.client.cache.readQuery({ query })
  // // const { latitude, longitude, term } = yelpInfo
  // }

  render() {
    // const { latitude, longitude, term } = this.yelpInfo
    // console.log(latitude)
    return (
      <div>
        <ApolloConsumer>
          {client => (
            <Select
              placeholder="Choose an attraction"
              options={attractions.map(attraction => ({
                key: attraction,
                text: attraction,
                value: attraction
              }))}
              onChange={event => {
                client.writeData({ data: { term: event.target.value } })
              }}
            />
          )}
          {/* <Query
            query={YELP_CATEGORY_SEARCH}
            variables={{ latitude, longitude, term }}
            client
          >
            {({ data, loading, error }) => {
              console.log(data)
              if (loading) return <p>Loading...</p>
              if (error) return <p>{error}</p>
              return (
                <div>
                  <h1>{data.searchBusinessTerm.businesses}</h1>
                </div>
              )
            }}
          </Query> */}
        </ApolloConsumer>
      </div>
    )
  }
}

// export default graphql(gql`
//   query searchBusiness($latitude: Float!, $longitude: Float!, $term: String) {
//     searchBusinessTerm(
//       latitude: $latitude
//       longitude: $longitude
//       term: $term
//     ) {
//       businesses {
//         price
//         name
//         rating
//         coordinates {
//           latitude
//           longitude
//         }
//       }
//     }
//   }
// `)(YelpCategorySearch)
