const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
    name: String
    cost: Int
  }
`;
const resolvers = {
  Query: {
    hello: () => 'hello world',
    name: () => 'Adewale',
    cost: () => 20,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`server started at ${url}`));
