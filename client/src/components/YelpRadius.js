import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Slider } from 'react-semantic-ui-range'
import { Label, Grid } from 'semantic-ui-react'

export const UPDATE_RADIUS = gql`
  mutation updateRadius($radius: Int!) {
    updateRadius(radius: $radius) @client {
      radius
    }
  }
`

export default class YelpRadius extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      radius: 10
    }
  }

  handleValueChange = (e, { value }) => {
    e.preventDefault()
    this.setState({
      radius: value
    })
  }
  render() {
    return (
      <Mutation mutation={UPDATE_RADIUS}>
        {mutate => (
          <Grid>
            <Grid.Row>
              <Grid.Column width={13} style={{ paddingRight: 0 }}>
                <Slider
                  discrete
                  settings={{
                    start: 10,
                    min: 1,
                    max: 10,
                    step: 1,
                    onChange: value => {
                      this.setState({ radius: value })
                      return mutate({ variables: { radius: value } })
                    }
                  }}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Label color="red">{this.state.radius}</Label>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </Mutation>
    )
  }
}
