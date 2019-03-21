module.exports = {
  Query: {
    callYelp: (
      _,
      { latitude, longitude, term, price, radius },
      { dataSources }
    ) =>
      dataSources.YelpAPI.getBusinesses(
        latitude,
        longitude,
        term,
        price,
        radius
      ),
    getDirections: (
      _,
      {
        originLatitude,
        originLongitude,
        destinationLatitude,
        destinationLongitude,
      },
      { dataSources }
    ) =>
      dataSources.GoogleAPI.createDirections(
        originLatitude,
        originLongitude,
        destinationLatitude,
        destinationLongitude
      ),
  },
};
