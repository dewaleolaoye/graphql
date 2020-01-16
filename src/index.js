const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello(name: String): String
    user: User
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

  input UserInfo {
    username: String!
    password: String!
    age: Int
  }

  type Mutation {
    register(userInfo: UserInfo!): RegisterResponse!
    login(userInfo: UserInfo!): String
  }
`;

const resolvers = {
  Query: {
    hello: (parent, { name }) => {
      return `hey ${name}`;
    },
    user: () => ({
      id: 1,
      username: 'Josh',
    }),
  },

  Mutation: {
    login: (parent, { userInfo: { username } }, context, info) => {
      console.log(context);
      return username;
    },

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

server.listen().then(({ url }) => console.log(`server started at ${url}`));
