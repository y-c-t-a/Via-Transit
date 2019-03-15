module.exports = {
  Query: {
    searchBusinessTerm: (_, { latitude, longitude, term }, { dataSources }) =>
      dataSources.YelpAPI.getBusinesses(latitude, longitude, term),
    getDirections: async (
      _,
      {
        originLatitude,
        originLongitude,
        destinationLatitude,
        destinationLongitude
      },
      { dataSources }
    ) =>
      await dataSources.GoogleAPI.createDirections(
        originLatitude,
        originLongitude,
        destinationLatitude,
        destinationLongitude
      )
  }
}
