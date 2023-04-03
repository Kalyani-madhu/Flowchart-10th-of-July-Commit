import { ApolloServer } from "apollo-server-micro";
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";
import { loadFile } from "graphql-import-files";

// ? The function below takes the path from the root directory
const typeDefs = loadFile("pages/api/sdl.graphql");

const driver = neo4j.driver(
  "neo4j+s://7ab92cfb.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "Q130C6HHmRyRJjEmKn8yy2H7-0CmecGTGz3Fvv_JI6k")
);
// @ts-ignore
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  const neoSchema = new Neo4jGraphQL({ typeDefs, driver });
  const apolloServer = new ApolloServer({
    schema: await neoSchema.getSchema(),
  });
  await apolloServer.start();
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
