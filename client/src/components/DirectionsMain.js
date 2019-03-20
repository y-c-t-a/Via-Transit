<<<<<<< HEAD
import React from 'react'
import { Query, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import DirectionsMap from './DirectionsMap'
=======
import React from 'react';
import { Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import DirectionsMap from './DirectionsMap';
>>>>>>> c0b2e503fdb243b07b843d4cd9fc2f0e74cf9c15

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
<<<<<<< HEAD
`

class DirectionsMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userSelectedBusinesses: [],
    }
  }

  async componentDidMount() {
    const client = this.props.client
    const { data } = await client.query({
      query: READ_ITINERARY,
    })
    this.setState({ userSelectedBusinesses: data.userSelectedBusinesses })
  }

  render() {
    return this.state.userSelectedBusinesses.length ? (
=======
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
    return this.state.userSelectedAttractions.length ? (
>>>>>>> c0b2e503fdb243b07b843d4cd9fc2f0e74cf9c15
      <div>
        <DirectionsMap
          id="directionsMap"
          userSelectedBusinesses={this.state.userSelectedBusinesses}
        />
      </div>
    ) : (
      <div>Loading</div>
<<<<<<< HEAD
    )
  }
}

export default withApollo(DirectionsMain)
=======
    );
  }
}

export default withApollo(DirectionsMain);
>>>>>>> c0b2e503fdb243b07b843d4cd9fc2f0e74cf9c15
