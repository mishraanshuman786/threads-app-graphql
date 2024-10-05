import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql";

const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());

async function createServer() {
  app.get("/", (req, res) => {
    res.json({ message: "Server is up and runing." });
  });

  // initialize graphql server
  let gqlServer = await createApolloGraphqlServer();

  await gqlServer.start();

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log("Server started at PORT: " + PORT);
  });
}

createServer();
