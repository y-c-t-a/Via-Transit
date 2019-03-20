import React from 'react'
import { Mutation, withApollo, ApolloProvider } from 'react-apollo'
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
  constructor(props) {
    super(props)
  }

  handleClick = async () => {
    // console.log('business', business)
    // const newBusiness = { ...business, __typename: 'business' }
    // console.log('new b', newBusiness)
    const previous = await this.props.client.query({
      query: READ_ITINERARY
    })
    console.log('previous', previous)
    // console.log('previous biz', previous.userSelectedBusinesses)
    this.props.client.writeQuery({
      query: READ_ITINERARY,
      data: {
        userSelectedBusinesses: [
          ...previous.data.userSelectedBusinesses,
          this.props.business
        ]
      }
    })
    console.log(
      'quiche',
      this.props.client.cache.data.data.ROOT_QUERY.userSelectedBusinesses
    )
  }

  render() {
    const { name, rating, price } = this.props.business
    const business = this.props.business
    // console.log('biz', business)
    // console.log('HERES THE PROPZZ => ', this.props)
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
