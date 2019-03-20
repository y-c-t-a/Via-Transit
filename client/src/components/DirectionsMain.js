import React from 'react';
import { Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import DirectionsMap from './DirectionsMap';

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
`;

class DirectionsMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelectedBusinesses: [],
    };
  }

  async componentDidMount() {
    const client = this.props.client;
    const { data } = await client.query({
      query: READ_ITINERARY,
    });
    this.setState({ userSelectedBusinesses: data.userSelectedBusinesses });
  }

  render() {
    return this.state.userSelectedBusinesses.length ? (
      <div>
        <DirectionsMap
          id="directionsMap"
          userSelectedBusinesses={this.state.userSelectedBusinesses}
        />
      </div>
    ) : (
      <div>Loading</div>
    );
  }
}

export default withApollo(DirectionsMain);
