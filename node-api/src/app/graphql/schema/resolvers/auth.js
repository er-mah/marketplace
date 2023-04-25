import { GraphQLError } from "graphql";

import { UserModel } from "../../../models/index.js";
import { jwtUtils, passwordsUtils } from "../../../../utils/index.js";
import { EmailService } from "../../../services/email.js";
import { emailVerificationUtils } from "../../../../utils/emailVerification.js";
import { UserRepository } from "../../../repositories/index.js";
import { extensions } from "sequelize/lib/utils/validator-extras";

const MARKETPLACE_MAIN_URL = process.env.MARKETPLACE_MAIN_URL;

const emailService = new EmailService();
const userRepository = new UserRepository();

export const auth = {
  Mutation: {
    login: async (_, { input: { email, password } }) => {
      try {
        const userFromEmail = await userRepository.getUserByEmail(email);

        if (!userFromEmail) {
          return new GraphQLError("Could not find user.");
        }

        const passwordsAreValid = await passwordsUtils.arePasswordsMatching(
          password,
          userFromEmail.dataValues.password
        );

        if (passwordsAreValid) {
          // Check if email was verified
          if (!userFromEmail.dataValues.is_email_verified) {
            return new GraphQLError(
              "Please check your inbox for a verification code.",
              {
                extensions: {
                  code: "EMAIL_VERIFICATION_ERROR",
                },
              }
            );
          }
          return {
            token: await jwtUtils.issueJWT(userFromEmail),
          };
        } else {
          return Promise.reject(new GraphQLError("Wrong credentials."));
        }
      } catch (e) {
        return Promise.reject(new GraphQLError(e));
      }
    },

    register: async (
      _,
      { input: { first_name, last_name, email, password } }
    ) => {
      try {
        // Check if the user does not already exist
        await userRepository.getUserByEmail(email).then((user) => {
          if (user) {
            return Promise.reject(
              new GraphQLError("This email address is already registered.")
            );
          }
        });

        // Hash the plain text password
        const pwdHash = await passwordsUtils.getHashedPassword(password);

        // Store new user in the database
        const newUser = await userRepository.createUser(
          first_name,
          last_name,
          email,
          pwdHash
        );

        newUser.verification_token =
          await emailVerificationUtils.generateEmailVerificationToken({
            id: newUser.dataValues.id,
            email: newUser.dataValues.email,
          });

        await newUser.save();

        // set the context for email verification
        const emailContext = {
          typeOfAction: "creación de cuenta",
          user: {
            first_name: newUser.dataValues.first_name,
            last_name: newUser.dataValues.last_name,
          },
          verificationUrl: `https://${MARKETPLACE_MAIN_URL}/cuenta/verificar$c=${newUser.dataValues.verification_token}`,
        };

        await emailService
          .sendVerificationEmail(newUser.dataValues.email, emailContext)
          .catch((reason) =>
            console.log("(Continuing...) Error sending email: ", reason)
          );

        return Promise.resolve(newUser.dataValues);
      } catch (e) {
        return Promise.reject(new GraphQLError(e.message));
      }
    },

    verifyAccount: async (_, { verification_token }) => {
      try {
        const userByToken = await userRepository.getUserByVerificationToken(
          verification_token
        );

        // Verify token signature
        const decoded =
          emailVerificationUtils.decodeEmailVerificationToken(
            verification_token
          );

        // Is there an email like the given one?
        if (userByToken.dataValues.email !== decoded.email) {
          return new GraphQLError("Invalid token.");
        }

        // Has it expired?
        if (emailVerificationUtils.isTokenExpired(decoded.exp)) {
          // Send another verification token to the email
          userByToken.verification_token =
            await emailVerificationUtils.generateEmailVerificationToken({
              id: userByToken.dataValues.id,
              email: userByToken.dataValues.email,
            });

          await userByToken.save();

          // set the context for email verification
          const emailContext = {
            typeOfAction: "creación de cuenta",
            user: {
              first_name: userByToken.dataValues.first_name,
              last_name: userByToken.dataValues.last_name,
            },
            verificationUrl: `https://${MARKETPLACE_MAIN_URL}/cuenta/verificar$c=${userByToken.dataValues.verification_token}`,
          };

          await emailService
            .sendVerificationEmail(userByToken.dataValues.email, emailContext)
            .catch((reason) =>
              console.log("(Continuing...) Error sending email: ", reason)
            );

          return new GraphQLError(
            "The token is expired. Don't worry, we've sent you another code for you to verify."
          );
        }

        userByToken.is_email_verified = true;
        await userByToken.save();

        return userByToken.dataValues;
      } catch (e) {
        return new GraphQLError(e.message);
      }
    },

    resendVerificationEmail: async (_, { email }) => {
      const userByEmail = await userRepository.getUserByEmail(email);

      if (!userByEmail) {
        return "Email not sent";
      }

      // Generate a new token
      userByEmail.verification_token =
        await emailVerificationUtils.generateEmailVerificationToken({
          id: userByEmail.dataValues.id,
          email: userByEmail.dataValues.email,
        });

      await userByEmail.save();

      // set the context for email verification
      const emailContext = {
        typeOfAction: "creación de cuenta",
        user: {
          first_name: userByEmail.dataValues.first_name,
          last_name: userByEmail.dataValues.last_name,
        },
        verificationUrl: `https://${MARKETPLACE_MAIN_URL}/cuenta/verificar$c=${userByEmail.dataValues.verification_token}`,
      };

      await emailService
        .sendVerificationEmail(userByEmail.dataValues.email, emailContext)
        .catch((reason) =>
          console.log("(Continuing...) Error sending email: ", reason)
        );

      return "Email sent";
    },

    verifiedUserAddsRemainingData: (
      _,
      {
        input: {
          address,
          phone,
          profile_image,
          dni,
          is_agency_representative,
          agency_id,
          locality_id,
        },
      }
    ) => {},
  },
};
