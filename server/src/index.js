const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const YelpAPI = require('./datasources/YelpAPI');


require('dotenv').config()

const dataSources = () => ({
  YelpAPI: new YelpAPI(),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
})


server.listen({ port: 4000 })
.then(({ url }) => console.log(`🚀 app running at ${url}`));
