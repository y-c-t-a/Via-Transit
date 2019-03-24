/* eslint-disable no-inner-declarations */
/* eslint-disable no-shadow */
import React, { Component } from 'react'
import { GOOGLE_API_KEY } from '../secrets'

export default class DirectionsMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rendererArr: [],
      currentMarkers: []
    }
  }

  onScriptLoad = props => {
    if (!props) props = this.props
    const userSelectedBusinesses = props.userSelectedBusinesses

    // make a new map Class if needed
    if (!this.map) {
      this.map = new window.google.maps.Map(
        document.getElementById('directionsMap'),
        {
          zoom: 13,
          center: { lat: 41.8955, lng: -87.6392 }
        }
      )
    }

    // loop over current renderers and knock them off the map
    if (this.state.rendererArr.length) {
      this.state.rendererArr.forEach(renderer => {
        renderer.setMap(null)
      })
    }

    // loop over current markers and knock them off the map
    if (this.state.currentMarkers.length) {
      this.state.currentMarkers.forEach(currentMarker => {
        currentMarker.setMap(null)
      })
    }

    // loop over itinerary and place markers on the map
    let markerArray = []
    for (let i = 0; i < userSelectedBusinesses.length; i++) {
      const infowindow = new window.google.maps.InfoWindow({
        content: userSelectedBusinesses[i].name
      })

      const marker = new window.google.maps.Marker({
        map: this.map,
        position: {
          lat: userSelectedBusinesses[i].coordinates.latitude,
          lng: userSelectedBusinesses[i].coordinates.longitude
        },
        title: userSelectedBusinesses[i].name
      })
      marker.addListener('click', function() {
        infowindow.open(this.map, marker)
      })
      markerArray.push(marker)
    }

    // initialize temporary array for new renderer instances
    let tempArr = []

    // this has to be async because directionsService takes time to call googs
    const pausePlease = async () => {
      // loop over the itinerary (on props) and ask google for directions
      for (let i = 0; i < userSelectedBusinesses.length - 1; i++) {
        const directionsService = new window.google.maps.DirectionsService()
        const directionsRenderer = new window.google.maps.DirectionsRenderer({
          map: this.map,
          options: { suppressMarkers: true }
        })

        const request = {
          origin: {
            lat: userSelectedBusinesses[i].coordinates.latitude,
            lng: userSelectedBusinesses[i].coordinates.longitude
          },
          destination: {
            lat: userSelectedBusinesses[i + 1].coordinates.latitude,
            lng: userSelectedBusinesses[i + 1].coordinates.longitude
          },
          travelMode: 'TRANSIT'
        }

        // pass the request object to directionService and attach directions response to a new renderer
        // push that renderer into the temporary array
        await directionsService.route(request, function(response, status) {
          if (status === 'OK') {
            directionsRenderer.setDirections(response)
            tempArr.push(directionsRenderer)
          } else {
            return `Google Directions Request failed due to ${status}`
          }
        })
      }
    }

    // call the async function
    pausePlease()

    // keep the current renderers & markres around to compare to nextProps
    this.setState({ rendererArr: tempArr, currentMarkers: markerArray })
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
