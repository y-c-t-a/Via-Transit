import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import SingleBusiness from './SingleBusiness'
import React, { Component } from 'react'

export default function yelpScripts(businesses, client, map) {
  const yelpLatArr = []
  const yelpLongArr = []

  businesses.forEach(business => {
    yelpLatArr.push(business.coordinates.latitude)
    yelpLongArr.push(business.coordinates.longitude)
  })

  const yelpNorthMost = Math.max(...yelpLatArr)
  const yelpSouthMost = Math.min(...yelpLatArr)
  const yelpEastMost = Math.max(...yelpLongArr)
  const yelpWestMost = Math.min(...yelpLongArr)

  const SW = new window.google.maps.LatLng({
    lat: yelpSouthMost,
    lng: yelpWestMost
  })
  const NE = new window.google.maps.LatLng({
    lat: yelpNorthMost,
    lng: yelpEastMost
  })

  var yelpMarkerArray = []

  const bounds = new window.google.maps.LatLngBounds()
  bounds.extend(SW)
  bounds.extend(NE)

  map.fitBounds(bounds)

  if (this.state.yelpCurrentMarkers.length) {
    this.state.yelpCurrentMarkers.forEach(currentMarker => {
      currentMarker.marker.setMap(null)
      ReactDOM.unmountComponentAtNode(currentMarker.div)
    })
  }

  businesses.forEach(business => {
    const div = document.createElement('div')
    ReactDOM.render(
      <ApolloProvider client={client}>
        <SingleBusiness business={business} />
      </ApolloProvider>,
      div
    )
    var infowindow = new window.google.maps.InfoWindow({
      content: div
    })
    var marker = new window.google.maps.Marker({
      map: map,
      position: {
        lat: business.coordinates.latitude,
        lng: business.coordinates.longitude
      },
      title: business.name
    })

    marker.addListener('click', function() {
      infowindow.open(this.map, marker)
    })
    yelpMarkerArray.push({ marker, div })
  })

  this.setState({ yelpCurrentMarkers: yelpMarkerArray })
}
