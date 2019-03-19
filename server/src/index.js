const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

// REVIEW: oh hell yeah
// REVIEW: watch capitalization
const YelpAPI = require('./datasources/YelpAPI')
const GoogleAPI = require('./DataSources/googleAPI')

//const path = require('path')
//path.join('path', 'to', 'file', 'some/with/slashes')
//
//fs.readFileSync(directoryRoot + "/cool-path-nome")
//"\path\to\file"

require('dotenv').config()

const dataSources = () => ({
  YelpAPI: new YelpAPI(),
  GoogleAPI: new GoogleAPI()
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
})

server
  .listen({ port: 4000 })
  .then(({ url }) => console.log(`🚀 app running at ${url}`))
