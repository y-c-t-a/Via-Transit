const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const GoogleAPI = require('./datasources/googleAPI');

require('dotenv').config()

const dataSources = () => ({
  GoogleAPI: new GoogleAPI(),
});

const context = {
  secrets: {}
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
});

server.listen({ port: 4000 })
.then(({ url }) => console.log(`🚀 app running at ${url}`));
