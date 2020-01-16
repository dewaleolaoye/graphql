const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
    name: String
    cost: Int
  }

  type User {
    id: ID!
    username: String
  }

  type Error {
    message: String
    field: String
    status: Int
  }

  type RegisterResponse {
    errors: [Error]
    users: [User]
  }

  type Mutation {
    register: RegisterResponse!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'hello world',
    name: () => 'Adewale',
    cost: () => 20,
  },

  Mutation: {
    register: () => ({
      errors: [
        {
          field: 'username',
          message: 'not found',
          status: 404,
        },
        {
          field: 'username',
          message: 'bad request',
          status: 400,
        },
      ],

      users: [
        {
          id: 1,
          username: 'Josh',
        },
        {
          id: 12,
          username: 'Adekunle',
        },
      ],
    }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`server started at ${url}`));
