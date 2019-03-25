import React from 'react'
import { withApollo } from 'react-apollo'
import { Button, Header, List, Image } from 'semantic-ui-react'
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
    await this.props.client.writeQuery({
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
        <Header size="large">
          <Image
            avatar
            src="Yelp_burst.png"
            size="large"
          />
          <List.Content floated="right" verticalAlign="middle">
            {name}
          </List.Content>
        </Header>
        <List celled size='medium'>
          <List.Item>
            <List.Content floated="left">Rating: </List.Content>
            <List.Content floated="right">{rating} / 5</List.Content>
          </List.Item>
          <List.Item>
            <List.Content floated="left">Price Range: </List.Content>
            <List.Content floated="right">{price}</List.Content>
          </List.Item>
        </List>
        <Button onClick={() => this.handleClick()}>Add to Itinerary</Button>
      </div>
    )
  }
}

export default withApollo(SingleBusiness)
