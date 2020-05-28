const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    stories: [Story!]!
  }

  type Story {
    id: ID!
    name: String!
    image: String!
    description: String!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    stories: (root, args, context) => {
      const results = fs.readFileSync("./stories.json", "utf-8");
      return JSON.parse(results);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
