const { RESTDataSource } = require('apollo-datasource-rest')
const axios = require('axios')

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
    const response = await axios({
      method: 'get',
      url: `${
        this.directionsBaseURL
      }origin=${originLatitude},${originLongitude}&destination=${destinationLatitude},${destinationLongitude}&mode=transit&key=${
        process.env.GOOGLE_API_KEY
      }`
    })
    console.log('DADA', response.data.routes)
    return response.data
  }
}

module.exports = GoogleAPI

/*
query {
  getDirections(originLatitude: 41.895541, originLongitude: -87.639220, destinationLatitude: 41.8902842, destinationLongitude: -87.6440364) {
    summary
    legs {
      steps {

      }
      duration
      distance
    }
    overview_polyline
    fare
    bounds
  }
}# Write your query or mutation here
*/
