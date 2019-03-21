import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { READ_ITINERARY } from './DirectionsMain'
import { Segment, Button } from 'semantic-ui-react'

export default class UserSelectedBusinesses extends Component {
  clickHandler = async event => {
    let name = event.target.value
    const { userSelectedBusinesses } = await this.props.client.readQuery({
      query: READ_ITINERARY,
    })
    const filtered = userSelectedBusinesses.filter(business => {
      return business.name !== name
    })
    await this.props.client.writeQuery({
      query: READ_ITINERARY,
      data: {
        userSelectedBusinesses: filtered,
      },
    })
  }

  render() {
    return (
      <Query query={READ_ITINERARY}>
        {({ data, loading, client, error }) => {
          if (loading) return <h2>Loading...</h2>
          if (error) return <p>ERROR: {error.message}</p>
          return (
            <Segment.Group>
              <Segment>Itinerary</Segment>
              <Segment.Group raised>
                {data.userSelectedBusinesses.map(business => (
                  <Segment key={business.name}>
                    {business.name}
                    <Button
                      key={business.name}
                      value={business.name}
                      color="red"
                      size="mini"
                      onClick={this.clickHandler}
                      content="x"
                    />
                  </Segment>
                ))}
              </Segment.Group>
            </Segment.Group>
          )
        }}
      </Query>
    )
  }
}
