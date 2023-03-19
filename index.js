const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs } = require("./schema/typeDefs");
const { resolvers } = require("./schema/resolvers");
const { GraphQLError } = require("graphql");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

//DEFINE SERVER
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//START THE SERVER
//STARTSTANDALONESERVER HELPS START APOLLO SERVER QUICKLY AND HAVE A BUILT-IN HTTP SERVER
const startServer = async function () {
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: ({ res, req }) => {
      const token = "123wqewq";
      if (token === "123wqewq") {
        return { tokenProperty: token };
      }
      throw new GraphQLError("The token is not correct", {
        extensions: {
          code: "Unauthenticated",
          http: {
            status: 401,
          },
        },
      });
    },
  });
  console.log(`Server is ready at ${url}`);
};

startServer();
