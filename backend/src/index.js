import express from 'express';
import chalk from 'chalk';

import { GraphQLServer } from 'graphql-yoga';
import { resolvers, typeDefs } from './graphql';
import { makeExecutableSchema } from 'graphql-tools';

import General from './graphql/general/model';

const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new GraphQLServer({
  schema: schema,
  context: (req) => {
    return { ...req, General: new General() };
  },
});

const options = {
  endpoint: '/graphql',
  playground: '/playground',
  port: 4000,
};

server.start(options, ({ port }) => {
  console.log('Server is running on localhost ' + port);
});
