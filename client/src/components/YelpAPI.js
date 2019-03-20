import React from 'react';
import { Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import YelpMap from './YelpMap';
import { CALL_YELP } from '../resolvers';

// export const CALL_YELP = gql`
//   query callYelp($latitude: Float!, $longitude: Float!, $term: String) {
//     callYelp(latitude: $latitude, longitude: $longitude, term: $term) {
//       businesses {
//         id
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
// `

export default function YelpAPI(props) {
  console.log('this is props', props)
  const {
    startLat,
    startLng,
    term,
    radius,
    rating,
    price,
  } = props.readYelp
  const latitude = startLat
  const longitude = startLng
  return (
    <div>
      <Query
        query={CALL_YELP}
        variables={{ latitude, longitude, term }}
      >
        {({ data, loading, error, client }) => {
          if (loading) return <h2>Loading...</h2>;
          if (error) return <p>ERROR: {error.message}</p>;
          console.log('this is data --->', data);
          return (
            <div>
              <h2>{data.callYelp.businesses[0].name}</h2>
              <YelpMap
                id="yelpMap"
                returnedBusinesses={data.callYelp.businesses}
                client={client}
              />
            </div>
          );
        }}
      </Query>
    </div>
  )
}
