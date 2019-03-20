import React, { Component } from 'react'
import { GOOGLE_API_KEY } from '../secrets'

export default class YelpMap extends Component {
  constructor(props) {
    super(props)
  }

  onScriptLoad = () => {
    const { returnedBusinesses } = this.props
    console.log(this.props)

    var markerArray = []

    var map = new window.google.maps.Map(document.getElementById('yelpMap'), {
      zoom: 13,
      center: { lat: 41.8955, lng: -87.6392 }
    })

    returnedBusinesses.map(business => {

      var marker = new window.google.maps.Marker({
        position: {
          lat: business.coordinates.latitude,
          lng: business.coordinates.longitude
        },
        map: map,
        title: "Yelp Attractions Result"
      })
      marker.setMap(map)
    })
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

  render() {
    return <div style={{ width: 500, height: 500 }} id={this.props.id} />
  }
}