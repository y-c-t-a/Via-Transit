import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { READ_ITINERARY } from './DirectionsMain'
import { Segment, Button, Icon } from 'semantic-ui-react'

export default class UserSelectedBusinesses extends Component {
  constructor() {
    super()
    this.state = {
      colors: [
        'grey',
        'blue',
        'red',
        'green',
        'yellow',
        'purple',
        'teal',
        'pink',
        'olive'
      ]
    }
  }

  deleteHandler = async (event, data) => {
    let name = data.value
    const { userSelectedBusinesses } = await this.props.client.readQuery({
      query: READ_ITINERARY
    })
    const filtered = userSelectedBusinesses.filter(business => {
      return business.name !== name
    })
    await this.props.client.writeQuery({
      query: READ_ITINERARY,
      data: {
        userSelectedBusinesses: filtered
      },
    })
  }

  upHandler = async (event, data) => {
    let name = data.value
    let { userSelectedBusinesses } = await this.props.client.readQuery({
      query: READ_ITINERARY
    })
    let newOrder = userSelectedBusinesses
    for (let i = 0; i < newOrder.length; i++) {
      if (newOrder[i].name === name) {
        if (!newOrder[i - 1]) break
        ;[newOrder[i], newOrder[i - 1]] = [newOrder[i - 1], newOrder[i]]
      }
    }
    await this.props.client.writeQuery({
      query: READ_ITINERARY,
      data: {
        userSelectedBusinesses: newOrder
      }
    })
  }

  downHandler = async (event, data) => {
    let name = data.value
    let { userSelectedBusinesses } = await this.props.client.readQuery({
      query: READ_ITINERARY
    })
    let newOrder = userSelectedBusinesses
    for (let i = 0; i < newOrder.length; i++) {
      if (newOrder[i].name === name) {
        if (!newOrder[i + 1]) break
        ;[newOrder[i + 1], newOrder[i]] = [newOrder[i], newOrder[i + 1]]
        break
      }
    }
    await this.props.client.writeQuery({
      query: READ_ITINERARY,
      data: {
        userSelectedBusinesses: newOrder
      }
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
                {data.userSelectedBusinesses.map((business, index) => (
                  <Segment key={business.name} color={this.state.colors[index]}>
                    {business.name}
                    <Button.Group floated="right">
                      <Button.Group>
                        <Button
                          icon
                          value={business.name}
                          size="mini"
                          onClick={this.upHandler}
                        >
                          <Icon name="chevron up" onClick={this.upHandler} />
                        </Button>
                        <Button
                          icon
                          onClick={this.downHandler}
                          value={business.name}
                          size="mini"
                        >
                          <Icon
                            name="chevron down"
                            onClick={this.downHandler}
                          />
                        </Button>
                      </Button.Group>
                      <Button
                        icon
                        value={business.name}
                        size="mini"
                        color="red"
                        onClick={this.deleteHandler}
                      >
                        <Icon name="delete" onClick={this.deleteHandler} />
                      </Button>
                    </Button.Group>
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
