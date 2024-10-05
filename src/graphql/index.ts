import { ApolloServer } from "@apollo/server";
import { User } from "./user/index";

export default function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query{
          ${User.queries}
      }
      
      type Mutation{
         ${User.mutations}
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  return gqlServer;
}
