const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    callYelp(
      latitude: Float!
      longitude: Float!
      term: String
      price: Int
      radius: Int
    ): Businesses
    getDirections(
      originLatitude: Float!
      originLongitude: Float!
      destinationLatitude: Float!
      destinationLongitude: Float!
    ): Routes
  }

  type Businesses {
    businesses: [Business]
  }

  type Business {
    id: String
    rating: Float
    price: String
    name: String
    coordinates: Coordinates
  }

  type Coordinates {
    latitude: Float
    longitude: Float
  }

  type GoogleCoordinates {
    lat: Float
    lng: Float
  }

  type Routes {
    routes: [RouteData]
  }

  type RouteData {
    summary: String
    legs: [Legs]
    # overview_polyline: String
    fare: Fare
    bounds: Directions
  }

  type Directions {
    southwest: GoogleCoordinates
    northeast: GoogleCoordinates
  }

  type Fare {
    currency: String
    value: Float
    text: String
  }

  type Legs {
    steps: [Step]
    duration: Duration
    distance: Distance
  }

  type Step {
    travel_mode: String
    start_location: GoogleCoordinates
    end_location: GoogleCoordinates
    # polyline: Point
    duration: Duration
    html_instructions: String
    distance: Distance
    transit_details: TransitDetails
  }

  type Duration {
    value: Float
    text: String
  }

  type Distance {
    value: Float
    text: String
  }

  # type Point {
  #   points: String
  # }

  type TransitDetails {
    arrival_stop: Stop
    departure_stop: Stop
    headway: Int
    num_stops: Int
    line: Line
  }

  type Stop {
    name: String
    location: GoogleCoordinates
  }

  type Line {
    name: String
    short_name: String
    color: String
    icon: String
    # agencies?
    vehicle: Vehicle
  }

  type Vehicle {
    name: String
    type: String
    icon: String
    local_icon: String
  }
`
module.exports = typeDefs
