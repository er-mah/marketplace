import { ApolloServer } from "@apollo/server";
import {
  resolvers,
  typeDefs,
} from "../../../../../src/app/graphql/schema/index.js";
import { emailVerificationUtils } from "../../../../../src/utils/emailVerification.js";
import { UserRepository } from "../../../../../src/app/repositories/index.js";
import { EmailService } from "../../../../../src/app/services/email.js";
import { UserModel } from "../../../../../src/app/models/index.js";

const userRepository = new UserRepository();
const emailService = new EmailService();

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
          },
        };

        const { body } = await testServer.executeOperation({
          query: mutation,
          variables: variables,
        });

        expect(body.singleResult.errors).toBeUndefined();
        expect(body.singleResult.data).toMatchObject({
          register: {
            email: "test.techmo.global@gmail.com",
            first_name: "Test",
            id: expect.any(String),
            last_name: "Test",
          },
        });
      });
    });
    describe("verifyAccount", () => {
      it.todo(
        "should return the user data when a valid verification token is provided"
      );
      /*, async () => {
        // Create a mock user
        const mockUser = {
          id: 1,
          email: "test@example.com",
          first_name: "John",
          last_name: "Doe",
          verification_token: "valid-token",
          is_email_verified: false,
        };

        // Mock the dependencies
        jest
          .spyOn(emailVerificationUtils, "decodeEmailVerificationToken")
          .mockImplementation(() => {
            return Promise.resolve({
              email: mockUser.email,
              exp: Date.now() + 3600000,
            });
          });

        jest.spyOn(userRepository, "getUserByEmail").mockImplementation(() => {
          return Promise.resolve(mockUser);
        });

        jest.spyOn(UserModel.prototype, "save").mockImplementation(() => {
          return Promise.resolve();
        });

        jest
          .spyOn(emailVerificationUtils, "generateEmailVerificationToken")
          .mockImplementation(() => {
            return Promise.resolve("new-token");
          });

        jest
          .spyOn(emailService, "sendVerificationEmail")
          .mockImplementation(() => {
            return Promise.resolve();
          });

        const mutation = `
          mutation VerifyAccount($verificationToken: String!) {
            verifyAccount(verification_token: $verificationToken) {
              id
              email
              first_name
              last_name
            }
          }
        `;

        const variables = {
          verificationToken: "valid-token"
        };

        const { body } = await testServer.executeOperation({
          query: mutation,
          variables: variables,
        });

        expect(body.singleResult.errors).toBeUndefined();

        // Assert that the function returned the correct data
        expect(body.singleResult.id).toBe(mockUser.id);
        expect(body.singleResult.email).toBe(mockUser.email);
        expect(body.singleResult.first_name).toBe(mockUser.first_name);
        expect(body.singleResult.last_name).toBe(mockUser.last_name);
        expect(body.singleResult.verification_token).toBe("new-token");
        expect(body.singleResult.is_email_verified).toBe(true);
      });
      
           */
    });
  });
});
