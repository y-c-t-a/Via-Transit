import React from 'react'

export class SingleBusiness extends React.Component {
  constructor(props) {
    super(props)
  }
  handleClick = () => {
    console.log('clicked')
  }
  render() {
    return (
      <div id="content">
        <h3>{this.props.name}</h3>
        <ul>
          <li>Rating: {this.props.rating}/5</li>
          <li>Price: ${this.props.price}</li>
        </ul>
        <button type="button" onClick={this.handleClick()}>
          Add To Route
        </button>
      </div>
    )
  }
}

export default SingleBusiness
