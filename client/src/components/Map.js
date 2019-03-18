import React, { Component } from 'react'
import { GOOGLE_API_KEY } from '../secrets'

export default class Map extends Component {
  onScriptLoad = () => {
    var markerArray = []

    var directionsService = new window.google.maps.DirectionsService()

    var map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: { lat: 41.8955, lng: -87.6392 }
    })

    var directionsDisplay = new window.google.maps.DirectionsRenderer({
      map: map
    })

    // var stepDisplay = new window.google.maps.InfoWindow()

    calculateAndDisplayRoute(
      directionsDisplay,
      directionsService,
      markerArray
      // stepDisplay,
      // map
    )

    function calculateAndDisplayRoute(
      directionsDisplay,
      directionsService,
      markerArray = []
      // stepDisplay,
      // map
    ) {
      // First, remove any existing markers from the map.
      for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null)
      }

      // Retrieve the start and end locations and create a DirectionsRequest using
      directionsService.route(
        {
          origin: { lat: 41.895541, lng: -87.63922 },
          destination: { lat: 41.8902842, lng: -87.6440364 },
          travelMode: 'WALKING'
        },
        function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response)
            // showSteps(response, markerArray, stepDisplay, map)
          } else {
            window.alert('Directions request failed due to ' + status)
          }
        }
      )
    }
    // function showSteps(directionResult, markerArray, stepDisplay, map) {
    //   // For each step, place a marker, and add the text to the marker's infowindow.
    //   // Also attach the marker to an array so we can keep track of it and remove it
    //   // when calculating new routes.
    //   var myRoute = directionResult.routes[0].legs[0]
    //   for (var i = 0; i < myRoute.steps.length; i++) {
    //     var marker = (markerArray[i] =
    //       markerArray[i] || new window.google.maps.Marker())
    //     marker.setMap(map)
    //     marker.setPosition(myRoute.steps[i].start_location)
    //   }
    // }
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
