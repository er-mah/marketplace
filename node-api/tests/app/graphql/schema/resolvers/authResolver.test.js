import { ApolloServer } from "@apollo/server";
import {
  resolvers,
  typeDefs,
} from "../../../../../src/app/graphql/schema/index.js";

describe("AuthResolver", () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  describe("mutation", () => {
    describe("register", () => {
      it("should register a user with sample data", () => {
        testServer.executeOperation({
          query: GET_LAUNCH,
          variables: { id: 1 },
        });
      });
    });
  });
});
