module.exports = {
  Query: {
    callYelp: (_, { latitude, longitude, term }, { dataSources }) =>
      dataSources.YelpAPI.getBusinesses(latitude, longitude, term),
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
