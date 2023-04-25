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
        const emailService = new EmailService();

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

        emailService
          .sendVerificationEmail(newUser.dataValues.email, emailContext)
          .catch((reason) =>
            console.log("(Continuando) Error al enviar mail: ", reason)
          );

        return Promise.resolve(newUser.dataValues);
      } catch (e) {
        return Promise.reject(new GraphQLError(e.message));
      }
    },

    login: async (_, { input: { email, password } }, { req }) => {
      return await UserModel.findOne({ where: { email: email } })
        .then(async (user) => {
          if (!user) {
            return Promise.reject(new GraphQLError("Could not find user."));
          }

          const passwordsAreValid = await passwordsUtils.arePasswordsMatching(
            password,
            user.password
          );

          if (passwordsAreValid) {
            return {
              id: user.id,
              token: await jwtUtils.issueJWT(user),
            };
          } else {
            return Promise.reject(new GraphQLError("Wrong credentials."));
          }
        })
        .catch((err) => {
          return Promise.reject(new GraphQLError(err));
        });
    },
  },
};
