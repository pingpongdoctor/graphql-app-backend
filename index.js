const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs } = require("./schema/typeDefs");
const { resolvers } = require("./schema/resolvers");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

//DEFINE SERVER
const server = new ApolloServer({ typeDefs, resolvers });

//START THE SERVER
//STARTSTANDALONESERVER HELPS START APOLLO SERVER QUICKLY AND HAVE A BUILT-IN HTTP SERVER
startStandaloneServer(server, {
  listen: { port: PORT },
}).then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});
