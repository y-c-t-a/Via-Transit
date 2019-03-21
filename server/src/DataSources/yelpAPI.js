const { RESTDataSource } = require('apollo-datasource-rest')
const axios = require('axios')

class YelpAPI extends RESTDataSource {
  constructor() {
    super()
    this.businessBaseURL = 'https://api.yelp.com/v3/businesses/search?'
  }

  async getBusinesses(latitude, longitude, term, price, radius) {
    const milesToMeters = miles => miles * 1609

    const newRadius = milesToMeters(radius)

    const response = await axios({
      method: 'get',
      url: `${
        this.businessBaseURL
      }term=${term}&latitude=${latitude}&longitude=${longitude}&price=${price}&radius=${newRadius}&limit`,
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
      }
    })
    return response.data
  }
}
module.exports = YelpAPI
