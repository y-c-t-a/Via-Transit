/* eslint-disable complexity */
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
    if (!props) props = this.props
    console.log('yelp map props', props)
    const { businesses } = props
    let { radius } = props
    console.log('radius', radius)
    const { latitude, longitude } = props.userSelectedBusinesses[
      props.userSelectedBusinesses.length - 1
    ].coordinates

    let zoomVar

    var markerArray = []

    if (!this.map) {
      this.map = new window.google.maps.Map(
        document.getElementById('yelpMap'),
        {
          zoom: 12,
          center: { lat: latitude, lng: longitude }
        }
      )
    }

    if (radius === 1) this.map.setZoom(13.5)
    else if (radius === 2) this.map.setZoom(12.3)
    else if (radius === 3) this.map.setZoom(12)
    else if (radius > 3) this.map.setZoom(11.5)
    else if (radius > 6) this.map.setZoom(10.5)

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
        map: this.map,
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
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script')
      s.type = 'text/javascript'
      s.src = `https://maps.google.com/maps/api/js?key=${GOOGLE_API_KEY}`
      var x = document.getElementsByTagName('script')[0]
      x.parentNode.insertBefore(s, x)
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!window.google) {
      var s = document.createElement('script')
      s.type = 'text/javascript'
      s.src = `https://maps.google.com/maps/api/js?key=${GOOGLE_API_KEY}`
      var x = document.getElementsByTagName('script')[0]
      x.parentNode.insertBefore(s, x)
      s.addEventListener('load', e => {
        this.onScriptLoad(nextProps)
      })
    } else if (nextProps.businesses !== this.props.businesses) {
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
