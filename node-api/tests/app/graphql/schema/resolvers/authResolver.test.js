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
      it("should register a user with sample data", async () => {

        const mutation = `
          mutation Register($input: RegisterInput!) {
            register(input: $input) {
              id
              email
              first_name
              last_name
            }
          }
        `;


        const variables = {
          input: {
            email: "test.techmo.global@gmail.com",
            first_name: "Test",
            last_name: "Test",
            password: "test123",
          }
        };

        const {body} = await testServer.executeOperation({
          query: mutation,
          variables: variables
        });

        expect(body.singleResult.errors).toBeUndefined();
        expect(body.singleResult.data).toMatchObject({
          register: {
            email: "test.techmo.global@gmail.com",
            first_name: "Test",
            id: expect.any(String),
            last_name: "Test"
          }
        });
      });
    });
  });
});
