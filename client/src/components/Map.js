/* eslint-disable max-statements */
/* eslint-disable complexity */
import React, { Component } from 'react'
import { GOOGLE_API_KEY } from '../secrets'
import SingleBusiness from './SingleBusiness'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { Menu, Checkbox, Item } from 'semantic-ui-react'

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      yelpCurrentMarkers: [],
      googleCurrentMarkers: [],
      rendererArr: [],
      views: []
    }
  }
  // eslint-disable-next-line max-statements
  onScriptLoad = props => {
    if (!props) props = this.props
    const { businesses } = props
    const { latitude, longitude } = props.userSelectedBusinesses[
      props.userSelectedBusinesses.length - 1
    ].coordinates
    const { userSelectedBusinesses } = props

    if (!this.map) {
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: latitude, lng: longitude }
      })
    }

    // Yelp
    const yelpScript = () => {
      console.log('yulp')
      const yelpMarkerArray = []

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

      const yelpBounds = new window.google.maps.LatLngBounds()
      yelpBounds.extend(SW)
      yelpBounds.extend(NE)

      this.map.fitBounds(yelpBounds)

      if (this.state.yelpCurrentMarkers.length) {
        this.state.yelpCurrentMarkers.forEach(currentMarker => {
          currentMarker.marker.setMap(null)
          ReactDOM.unmountComponentAtNode(currentMarker.div)
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
        yelpMarkerArray.push({ marker, div })
        this.setState({ yelpCurrentMarkers: yelpMarkerArray })
      })
    }

    // Directions
    const directionsScript = () => {
      const latArr = []
      const longArr = []

      userSelectedBusinesses.forEach(business => {
        latArr.push(business.coordinates.latitude)
        longArr.push(business.coordinates.longitude)
      })

      const northMost = Math.max(...latArr)
      const southMost = Math.min(...latArr)
      const eastMost = Math.max(...longArr)
      const westMost = Math.min(...longArr)

      const SW = new window.google.maps.LatLng({
        lat: southMost,
        lng: westMost
      })
      const NE = new window.google.maps.LatLng({
        lat: northMost,
        lng: eastMost
      })

      const bounds = new window.google.maps.LatLngBounds()
      bounds.extend(SW)
      bounds.extend(NE)

      this.map.fitBounds(bounds)

      // loop over current renderers and knock them off the map
      if (this.state.rendererArr.length) {
        this.state.rendererArr.forEach(renderer => {
          renderer.setMap(null)
        })
        this.state.rendererArr.forEach(renderer => {
          renderer.setPanel(null)
        })
      }

      // loop over current markers and knock them off the map
      if (this.state.googleCurrentMarkers.length) {
        this.state.googleCurrentMarkers.forEach(currentMarker => {
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
            options: { suppressMarkers: true, preserveViewport: true }
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
              directionsRenderer.setPanel(document.getElementById('dirPanel'))
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
      this.setState({ rendererArr: tempArr, googleCurrentMarkers: markerArray })
    }

    const itineraryScript = () => {
      const latArr = []
      const longArr = []

      userSelectedBusinesses.forEach(business => {
        latArr.push(business.coordinates.latitude)
        longArr.push(business.coordinates.longitude)
      })

      const northMost = Math.max(...latArr)
      const southMost = Math.min(...latArr)
      const eastMost = Math.max(...longArr)
      const westMost = Math.min(...longArr)

      const SW = new window.google.maps.LatLng({
        lat: southMost,
        lng: westMost
      })
      const NE = new window.google.maps.LatLng({
        lat: northMost,
        lng: eastMost
      })

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

      const bounds = new window.google.maps.LatLngBounds()
      bounds.extend(SW)
      bounds.extend(NE)

      this.map.fitBounds(bounds)

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

      this.setState({ googleCurrentMarkers: markerArray })
    }

    const wipeItinerary = async () => {
      await this.state.googleCurrentMarkers.forEach(currentMarker => {
        currentMarker.setMap(null)
      })
    }

    const wipeSearch = async () => {
      await this.state.yelpCurrentMarkers.forEach(currentMarker => {
        currentMarker.marker.setMap(null)
        ReactDOM.unmountComponentAtNode(currentMarker.div)
      })
    }

    const wipeRenderer = async () => {
      await this.state.rendererArr.forEach(renderer => {
        renderer.setMap(null)
      })
      await this.state.rendererArr.forEach(renderer => {
        renderer.setPanel(null)
      })
    }

    const views = this.state.views

    if (views.length === 0) {
      wipeItinerary()
      wipeRenderer()
      wipeSearch()
    }
    if (views[0] === 'Search' && views.length === 1) {
      wipeItinerary()
      wipeRenderer()
      yelpScript()
    }
    if (views[0] === 'Directions' && views.length === 1) {
      wipeSearch()
      directionsScript()
    }
    if (views[0] === 'Itinerary' && views.length === 1) {
      wipeRenderer()
      wipeSearch()
      itineraryScript()
    }
    if (
      views.includes('Search') &&
      views.includes('Itinerary') &&
      views.length === 2
    ) {
      wipeRenderer()
      itineraryScript()
      yelpScript()
    }
    if (
      views.includes('Search') &&
      views.includes('Directions') &&
      views.length === 2
    ) {
      wipeItinerary()
      yelpScript()
      directionsScript()
    }
    if (views.includes('Itinerary') && views.includes('Directions')) {
      wipeSearch()
      itineraryScript()
      directionsScript()
    }
    if (views.length === 3) {
      yelpScript()
      itineraryScript()
      directionsScript()
    }
  }

  handleChange = async (event, { value }) => {
    let newArr = []
    if (this.state.views.length && this.state.views.includes(value)) {
      newArr = this.state.views.filter(elem => elem !== value)
    } else {
      newArr = [...this.state.views, value]
    }
    await this.setState({ views: newArr })
    this.onScriptLoad()
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
    return (
      <div>
        <div>
          <Checkbox
            toggle
            label="Search"
            value="Search"
            onChange={(event, value) => this.handleChange(event, value)}
          />
          <Checkbox
            toggle
            label="Itinerary"
            value="Itinerary"
            onChange={(event, value) => this.handleChange(event, value)}
          />
          <Checkbox
            toggle
            label="Directions"
            value="Directions"
            onChange={(event, value) => this.handleChange(event, value)}
          />
        </div>
        <div style={{ width: 500, height: 500 }} id="map" />
      </div>
    )
  }
}
