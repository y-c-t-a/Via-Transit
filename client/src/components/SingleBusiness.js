import React from 'react'
import { Mutation, withApollo, ApolloProvider } from 'react-apollo'
import { Button } from 'semantic-ui-react'
import gql from 'graphql-tag'

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

  handleClick = () => {
    console.log('clicked')
  }

  render() {
    console.log('HERES THE PROPZZ => ', this.props)
    return (
      <div id="content">
        <h3>{this.props.name}</h3>
        <ul>
          <li>Rating: {this.props.rating}/5</li>
          <li>Price: ${this.props.price}</li>
        </ul>
        <button>hey</button>
        <Mutation mutation={UPDATE_SELECTED_BUSINESSES}>
          {mutate => <Button>hey</Button>}
        </Mutation>
      </div>
    )
  }
}

export default SingleBusiness
