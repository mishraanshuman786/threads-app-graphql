import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "./lib/db";
const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());

async function createServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query{
           getName(name:String):String
      }
      
      type Mutation{
        createUser(firstName:String!, lastName:String!, email:String!, password:String!):Boolean
      }
    `,
    resolvers: {
      Query: {
        getName: (_, { name }: { name: String }) => `My name is ${name}`,
      },
      Mutation: {
        createUser: async (
          _,
          {
            firstName,
            lastName,
            email,
            password,
          }: {
            firstName: string;
            lastName: string;
            password: string;
            email: string;
          }
        ) => {
          await prismaClient.user.create({
            data: { email, firstName, lastName, password, salt: "random_salt" },
          });
          return true;
        },
      },
    },
  });

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and runing." });
  });

  await gqlServer.start();

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log("Server started at PORT: " + PORT);
  });
}

createServer();
