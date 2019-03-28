const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const YelpAPI = require('./datasources/YelpAPI')
const GoogleAPI = require('./DataSources/googleAPI')

require('dotenv').config()

const dataSources = () => ({
  YelpAPI: new YelpAPI(),
  GoogleAPI: new GoogleAPI(),
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
})

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`🚀 app running at ${url}`))
