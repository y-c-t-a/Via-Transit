/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { updateURL } from '../resolvers'
import API from './API'
import YelpCategorySearch from './YelpCategorySearch'
import YelpPrice from './YelpPrice'
import YelpRadius from './YelpRadius'
import UserSelectedBusinesses from './UserSelectedBusinesses'
import { Grid, Segment, Label, Header } from 'semantic-ui-react'

export const READ_YELP = gql`
  query {
    readYelp @client {
      startLat
      startLng
      term
      radius
      price
    }
  }
`

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
`
export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Query query={READ_YELP}>
          {({ loading: loadingOne, data: { readYelp } }) => (
            // console.log('readYelp', readYelp)
            <Query query={READ_ITINERARY}>
              {({
                loading: loadingTwo,
                data: { userSelectedBusinesses },
                client
              }) => {
                if (loadingOne || loadingTwo) return <span>loading...</span>
                if (userSelectedBusinesses) updateURL(userSelectedBusinesses)
                return (
                  <Grid columns={3} centered padded>
                    <Grid.Row style={{ paddingBottom: 0 }}>
                      <Header
                        as="h1"
                        style={{ paddingTop: 14, paddingBottom: 0 }}
                      >
                        Via Transit
                      </Header>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={4}>
                        <Segment.Group>
                          <Segment textAlign="center">Filters</Segment>
                          <Segment.Group raised>
                            <Segment>
                              <Label attached="top">Category</Label>
                              <YelpCategorySearch />
                            </Segment>
                            <Segment>
                              <Label attached="top" content="Price" />
                              <YelpPrice />
                            </Segment>
                            <Segment>
                              <Label attached="top">Radius in Miles</Label>

                              <YelpRadius />
                            </Segment>
                          </Segment.Group>
                        </Segment.Group>
                      </Grid.Column>
                      <Grid.Column width={8}>
                        <API
                          readYelp={readYelp}
                          readItinerary={userSelectedBusinesses}
                        />
                      </Grid.Column>
                      <Grid.Column width={4}>
                        <Grid.Row>
                          <UserSelectedBusinesses client={client} />
                        </Grid.Row>
                        <Grid.Row>
                          <Segment.Group>
                            <Segment textAlign="center">Directions</Segment>
                            <Segment id="directionsPanel" />
                          </Segment.Group>
                        </Grid.Row>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                )
              }}
            </Query>
          )}
        </Query>
      </div>
    )
  }
}
