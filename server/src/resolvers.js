module.exports = {
  Query: {
    callYelp: (_, { latitude, longitude, term, price }, { dataSources }) =>
      dataSources.YelpAPI.getBusinesses(latitude, longitude, term, price),
    getDirections: (
      _,
      {
        originLatitude,
        originLongitude,
        destinationLatitude,
        destinationLongitude
      },
      { dataSources }
    ) =>
      dataSources.GoogleAPI.createDirections(
        originLatitude,
        originLongitude,
        destinationLatitude,
        destinationLongitude
      )
  }
}
