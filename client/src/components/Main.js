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
import { Grid, Segment, Label, Header, Button } from 'semantic-ui-react'

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
      <Query query={READ_YELP}>
        {({ loading: loadingOne, data: { readYelp } }) => (
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
                  <Grid.Row style={{ paddingBottom: 14 }}>
                    <Header
                      as="h1"
                      style={{ paddingTop: 16, paddingBottom: 0 }}
                    >
                      Via Transit
                    </Header>
                  </Grid.Row>
                  <Grid.Row style={{ height: '90vh' }}>
                    <Grid.Column width={4} style={{ paddingRight: 0 }}>
                      <Segment.Group>
                        <Segment textAlign="center">Yelp Filters</Segment>
                        <Segment.Group raised>
                          <Segment>
                            <Label attached="top">Category</Label>
                            <YelpCategorySearch />
                          </Segment>
                          <Segment>
                            <Label attached="top" content="Price" />
                            <YelpPrice price={readYelp.price} />
                          </Segment>
                          <Segment>
                            <Label attached="top">Radius in Miles</Label>
                            <YelpRadius />
                          </Segment>
                        </Segment.Group>
                      </Segment.Group>
                      <Segment.Group>
                        <Segment textAlign="center">
                          <Button>
                            <a
                              target="_blank"
                              href="https://www.transitchicago.com/howto/"
                              style={{ color: '#696969' }}
                            >
                              How to ride the CTA
                            </a>
                          </Button>
                        </Segment>
                      </Segment.Group>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <API
                        style={{ width: '100%', height: '100%' }}
                        readYelp={readYelp}
                        readItinerary={userSelectedBusinesses}
                      />
                    </Grid.Column>
                    <Grid.Column width={4} style={{ paddingLeft: 0 }}>
                      <UserSelectedBusinesses client={client} />
                      <Segment.Group style={{ overflow: 'scroll' }}>
                        <Segment textAlign="center">Step by Step</Segment>
                        <Segment
                          id="directionsPanel"
                          style={{ height: '33vh' }}
                        />
                      </Segment.Group>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              )
            }}
          </Query>
        )}
      </Query>
    )
  }
}
