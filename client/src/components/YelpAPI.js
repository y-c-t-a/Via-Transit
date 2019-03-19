import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export default class YelpAPI extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // console.log('props', this.props.state)
    const state = this.props.state
    console.log('Die Stadt', state)
    return (
      <div>
        {/* <Query query={} */}
        <p>{this.props.term}</p>
      </div>
    )
  }
}
