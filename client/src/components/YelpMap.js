import React, { Component } from 'react'
import { GOOGLE_API_KEY } from '../secrets'
import SingleBusiness from './SingleBusiness'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'

export default class YelpMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMarkers: []
    }
  }
  onScriptLoad = props => {
    debugger
    if (!props) props = this.props
    const { businesses } = props

    var markerArray = []

    if (!this.map) {
      this.map = new window.google.maps.Map(
        document.getElementById('yelpMap'),
        {
          zoom: 13,
          center: { lat: 41.8955, lng: -87.6392 }
        }
      )
    }

    if (this.state.currentMarkers.length) {
      this.state.currentMarkers.forEach(currentMarker => {
        currentMarker.setMap(null)
      })
    }

    businesses.forEach(business => {
      const div = document.createElement('div')
      ReactDOM.render(
        <ApolloProvider client={props.client}>
          <SingleBusiness business={business} />
        </ApolloProvider>,
        div
      )
      var infowindow = new window.google.maps.InfoWindow({
        content: div
      })
      var marker = new window.google.maps.Marker({
        position: {
          lat: business.coordinates.latitude,
          lng: business.coordinates.longitude
        },
        title: business.name
      })

      marker.addListener('click', function() {
        infowindow.open(this.map, marker)
      })
      markerArray.push(marker)
    })

    this.setState({ currentMarkers: markerArray })

    markerArray.forEach(marker => marker.setMap(this.map))
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script')
      s.type = 'text/javascript'
      s.src = `https://maps.google.com/maps/api/js?key=${GOOGLE_API_KEY}`
      var x = document.getElementsByTagName('script')[0]
      x.parentNode.insertBefore(s, x)
      // Below is important.
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props !== nextProps) {
  //     this.onScriptLoad(nextProps)
  //     return true
  //   } else return false
  // }

  componentWillReceiveProps(nextProps) {
    if (!window.google) {
      var s = document.createElement('script')
      s.type = 'text/javascript'
      s.src = `https://maps.google.com/maps/api/js?key=${GOOGLE_API_KEY}`
      var x = document.getElementsByTagName('script')[0]
      x.parentNode.insertBefore(s, x)
      // Below is important.
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad(nextProps)
      })
    } else {
      this.onScriptLoad(nextProps)
    }
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return <div style={{ width: 500, height: 500 }} id={this.props.id} />
  }
}
