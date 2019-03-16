const { RESTDataSource } = require('apollo-datasource-rest')

class GoogleAPI extends RESTDataSource {
  constructor() {
    super()
    this.directionsBaseURL =
      'https://maps.googleapis.com/maps/api/directions/json?'
  }

  async createDirections(
    originLatitude,
    originLongitude,
    destinationLatitude,
    destinationLongitude
  ) {

    const response = await this.get(
      `${
        this.directionsBaseURL
      }origin=${originLatitude},${originLongitude}&destination=${destinationLatitude},${destinationLongitude}&mode=transit&key=${
        process.env.GOOGLE_API_KEY
      }`
    )
    return response
  }
}

module.exports = GoogleAPI
