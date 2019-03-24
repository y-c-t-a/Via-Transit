import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Slider } from 'react-semantic-ui-range'
import { Label } from 'semantic-ui-react'

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
      radius: 3
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
          <div>
            <Slider
              discrete
              settings={{
                start: 3,
                min: 1,
                max: 10,
                step: 1,
                onChange: value => {
                  this.setState({ radius: value })
                  return mutate({ variables: { radius: value } })
                }
              }}
            />
            <Label color="red">{this.state.radius}</Label>
          </div>
        )}
      </Mutation>
    )
  }
}
