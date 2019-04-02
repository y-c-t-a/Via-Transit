/* eslint-disable max-statements */
/* eslint-disable complexity */
import React, { Component } from 'react'
import { REACT_APP_GOOGLE_API_KEY } from '../secrets'
import SingleBusiness from './SingleBusiness'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { Checkbox, Grid, Segment, Container } from 'semantic-ui-react'

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
    const { userSelectedBusinesses } = props
    let latitude
    let longitude
    if (this.props.readItinerary && this.props.readItinerary.length) {
      latitude = this.props.readItinerary[this.props.readItinerary.length - 1]
        .coordinates.latitude
      longitude = this.props.readItinerary[this.props.readItinerary.length - 1]
        .coordinates.longitude
    } else {
      latitude = 41.883498
      longitude = -87.624951
    }

    if (!this.map) {
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: latitude, lng: longitude }
      })
    }

    const latArr = []
    const lngArr = []

    // Yelp
    const yelpScript = () => {
      const yelpMarkerArray = []

      businesses.forEach(business => {
        latArr.push(business.coordinates.latitude)
        lngArr.push(business.coordinates.longitude)
      })

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
          title: business.name,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue.png'
          }
        })

        marker.addListener('click', function() {
          infowindow.open(this.map, marker)
        })
        yelpMarkerArray.push({ marker, div })
        this.setState({ yelpCurrentMarkers: yelpMarkerArray })
      })
    }

    // Directions
    const directionsScript = async () => {
      userSelectedBusinesses.forEach(business => {
        latArr.push(business.coordinates.latitude)
        lngArr.push(business.coordinates.longitude)
      })

      // loop over current renderers and knock them off the map
      if (this.state.rendererArr.length) {
        this.state.rendererArr.forEach(renderer => {
          renderer.setMap(null)
          renderer.setPanel(null)
        })
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
              directionsRenderer.setPanel(
                document.getElementById('directionsPanel')
              )
              tempArr.push(directionsRenderer)
            } else {
              return `Google Directions Request failed due to ${status}`
            }
          })
          this.setState({ rendererArr: tempArr })
        }
      }

      // call the async function
      await pausePlease()

      // keep the current renderers & markres around to compare to nextProps
    }

    // Itinerary
    const itineraryScript = () => {
      userSelectedBusinesses.forEach(business => {
        latArr.push(business.coordinates.latitude)
        lngArr.push(business.coordinates.longitude)
      })

      if (this.state.googleCurrentMarkers.length) {
        this.state.googleCurrentMarkers.forEach(currentMarker => {
          currentMarker.setMap(null)
        })
      }
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
          title: userSelectedBusinesses[i].name,
          icon: {
            url: `http://maps.google.com/mapfiles/kml/paddle/${i + 1}.png`
          }
        })
        marker.addListener('click', function() {
          infowindow.open(this.map, marker)
        })
        markerArray.push(marker)
      }

      this.setState({ googleCurrentMarkers: markerArray })
    }

    const views = this.state.views

    if (views[0] === 'Search' && views.length === 1) {
      yelpScript()
    }
    if (views[0] === 'Directions' && views.length === 1) {
      directionsScript()
    }
    if (views[0] === 'Itinerary' && views.length === 1) {
      itineraryScript()
    }
    if (
      views.includes('Search') &&
      views.includes('Itinerary') &&
      views.length === 2
    ) {
      itineraryScript()
      yelpScript()
    }
    if (
      views.includes('Search') &&
      views.includes('Directions') &&
      views.length === 2
    ) {
      yelpScript()
      directionsScript()
    }
    if (views.includes('Itinerary') && views.includes('Directions')) {
      itineraryScript()
      directionsScript()
    }
    if (views.length === 3) {
      yelpScript()
      itineraryScript()
      directionsScript()
    }

    const northMost = Math.max(...latArr)
    const southMost = Math.min(...latArr)
    const eastMost = Math.max(...lngArr)
    const westMost = Math.min(...lngArr)

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

    if (latArr.length >= 2) this.map.fitBounds(bounds)
    if (latArr.length === 1)
      this.map.setCenter({ lat: latArr[0], lng: lngArr[0] })
  }

  handleChange = async (event, data) => {
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
        renderer.setPanel(null)
        renderer.setOptions({
          directions: null
        })
        renderer.setOptions({ suppressPolylines: true })
      })
      await this.setState({ rendererArr: [] })
    }

    let newArr = []

    if (data.checked) {
      newArr = [...this.state.views, data.value]
    } else {
      newArr = this.state.views.filter(elem => elem !== data.value)
      switch (data.value) {
        case 'Search':
          wipeSearch()
          break
        case 'Itinerary':
          wipeItinerary()
          break
        case 'Directions':
          wipeRenderer()
          break
        default:
          console.log('this is default')
      }
    }
    await this.setState({ views: newArr })
    this.onScriptLoad()
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script')
      s.type = 'text/javascript'
      s.src = `https://maps.google.com/maps/api/js?key=${REACT_APP_GOOGLE_API_KEY}`
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
      s.src = `https://maps.google.com/maps/api/js?key=${REACT_APP_GOOGLE_API_KEY}`
      var x = document.getElementsByTagName('script')[0]
      x.parentNode.insertBefore(s, x)
      s.addEventListener('load', e => {
        this.onScriptLoad(nextProps)
      })
    } else if (
      nextProps.businesses !== this.props.businessess ||
      nextProps.userSelectedBusinesses !== this.props.userSelectedBusinesses
    ) {
      this.onScriptLoad(nextProps)
    }
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Grid verticalAlign="middle" centered>
        <Grid.Column style={{ paddingTop: 0, height: '100%' }}>
          <Grid.Row style={{ paddingTop: 0 }}>
            <Segment.Group horizontal>
              <Segment>
                <Checkbox
                  toggle
                  label="Search Yelp"
                  value="Search"
                  onChange={(event, data) => this.handleChange(event, data)}
                />
              </Segment>
              <Segment>
                <Checkbox
                  toggle
                  label="Itinerary"
                  value="Itinerary"
                  onChange={(event, data) => this.handleChange(event, data)}
                />
              </Segment>
              <Segment>
                <Checkbox
                  toggle
                  label="Directions"
                  value="Directions"
                  onChange={(event, data) => this.handleChange(event, data)}
                />
              </Segment>
            </Segment.Group>
          </Grid.Row>
          <Grid.Row style={{ width: '100%', height: '100%' }}>
            <Container style={{ width: '100%', height: '75vh' }} id="map" />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    )
  }
}
