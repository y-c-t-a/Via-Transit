import React from 'react';
import { Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import YelpMap from './YelpMap';

export const CALL_YELP = gql`
  query callYelp($latitude: Float!, $longitude: Float!, $term: String) {
    callYelp(latitude: $latitude, longitude: $longitude, term: $term) {
      businesses {
        id
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
`;

class YelpAPI extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      returnedBusinesses: [],
    };
  }

  async componentDidMount() {
    const state = this.props.state;
    const client = this.props.client;
    const { price, name, rating, term } = state;
    const { startLat, startLng } = state;
    const latitude = startLat,
      longitude = startLng;

    const { data } = await client.query({
      query: CALL_YELP,
      variables: { latitude, longitude, term },
    });
    this.setState({ returnedBusinesses: data.callYelp.businesses });
    client.cache.writeData({
      id: 'returnedBusinesses',
      data: data.callYelp.businesses,
    });
    console.log('this is state $$$', this.state.returnedBusinesses);
  }

  render() {
    return this.state.returnedBusinesses.length ? (
      <div>
        <YelpMap
          id="yelpMap"
          returnedBusinesses={this.state.returnedBusinesses}
        />
      </div>
    ) : (
      <div>Loading</div>
    );
  }
}

export default withApollo(YelpAPI);
