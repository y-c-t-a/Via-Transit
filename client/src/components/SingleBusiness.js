import React from 'react'
import { withApollo } from 'react-apollo'
import { Button } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { READ_ITINERARY } from './DirectionsMain'

export const UPDATE_SELECTED_BUSINESSES = gql`
  mutation updateSelectedBusinesses($business: Business) {
    updateSelectedBusinesses(business: $business) @client {
      userSelectedBusinesses
    }
  }
`

class SingleBusiness extends React.Component {
  handleClick = async () => {
    const previous = await this.props.client.readQuery({
      query: READ_ITINERARY
    })
    this.props.client.writeQuery({
      query: READ_ITINERARY,
      data: {
        userSelectedBusinesses: [
          ...previous.userSelectedBusinesses,
          this.props.business
        ]
      }
    })
  }

  render() {
    const { name, rating, price } = this.props.business

    return (
      <div id="content">
        <h3>{name}</h3>
        <div>
          <div>Rating: {rating}/5</div>
          <div>Price: {price}</div>
        </div>
        <Button onClick={() => this.handleClick()}>Add to Itinerary</Button>
      </div>
    )
  }
}

export default withApollo(SingleBusiness)
