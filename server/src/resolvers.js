module.exports = {
  Query: {
    searchBusinessTerm: (_, { latitude, longitude, term }, { dataSources }) =>
      dataSources.YelpAPI.getBusinesses(latitude, longitude, term)
  }
}
