const { RESTDataSource } = require('apollo-datasource-rest')

class GoogleAPI extends RESTDataSource {
  constructor() {
    super()
    this.directions = 'https://maps.googleapis.com/maps/api/directions/'
  }
}

module.exports = GoogleAPI;
