const express = require('express');
const http = require('http');
const uuid = require('uuid');
const moment = require('moment')
const { ApolloServer } = require('apollo-server-express');
const { GRAPHQL_PORT } = require('../constants/config');
const { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const typeDefs = require('./schemas/schemas');
const { resolvers } = require('./resolvers/resolvers');

const myPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  requestDidStart(requestContext) {
    const requisitionTracking = uuid();
    console.log(`${moment().format('YYYY-MM-DD H:mm:ss')} - {UUID=${requisitionTracking}} - Request started!`);
    console.log(`${moment().format('YYYY-MM-DD H:mm:ss')} - {UUID=${requisitionTracking}} - Query: ` + requestContext.request.query);
    console.log(`${moment().format('YYYY-MM-DD H:mm:ss')} - {UUID=${requisitionTracking}} - variables: ` + JSON.stringify(requestContext.request.variables));

    return {
      willSendResponse(requestContext) {
        console.log(`${moment().format('YYYY-MM-DD H:mm:ss')} - {UUID=${requisitionTracking}} - Request finished!`);
      },
    }
  },
};


async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
      // myPlugin
    ],
    // [ApolloServerPluginLandingPageGraphQLPlayground({})]:
  });
  await server.start();

  // Mount Apollo middleware here.
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: GRAPHQL_PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:8083${server.graphqlPath}`);
  return { server, app };
}

startApolloServer();