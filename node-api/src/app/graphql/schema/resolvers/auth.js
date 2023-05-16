import { GraphQLError } from "graphql";

import { jwtUtils, passwordsUtils } from "../../../../utils/index.js";
import { EmailService } from "../../../services/email.js";
import { emailVerificationUtils } from "../../../../utils/emailVerification.js";
import { UserRepository } from "../../../repositories/index.js";
import { AuthValidations } from "../../validations/index.js";

const MARKETPLACE_MAIN_URL = process.env.MARKETPLACE_MAIN_URL;
const MARKETPLACE_PASSWORD_RECOVERY_ENDPOINT =
  process.env.MARKETPLACE_PASSWORD_RECOVERY_ENDPOINT;
const MARKETPLACE_EMAIL_VERIFICATION_ENDPOINT =
  process.env.MARKETPLACE_EMAIL_VERIFICATION_ENDPOINT;

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
                  details: {
                    message: "Revisa tu correo para confirmar tu cuenta.",
                  },
                },
              }
            );
          }


          if (
            userFromEmail.dataValues.is_email_verified &&
            !userFromEmail.dataValues.has_provided_additional_data
          ) {

            return {
              token: await jwtUtils.issueJWT(userFromEmail),
              pending_steps: "provideAdditionalData",
            };
          }

          return {
            token: await jwtUtils.issueJWT(userFromEmail),
            pending_steps: "no additional steps",
          };


        } else {
          return new GraphQLError("Wrong credentials.");
        }
      } catch (e) {
        return new GraphQLError(e);
      }
    },

    register: async (
      _,
      { input: { first_name, last_name, email, password, repeat_password } }
    ) => {
      try {
        const validationSchema = AuthValidations.registerSchema();

        try {
          await validationSchema.validateAsync(
            {
              first_name,
              last_name,
              email,
              password,
              repeat_password,
            },
            {
              context: { formName: "RegisterForm" }, // Puedes cambiar "Nombre del formulario" por el nombre que desees
            }
          );
        } catch (error) {
          const errors = {};
          error.details.forEach((detail) => {
            errors[detail.context.key] = {
              message: detail.message,
            };
          });
          return new GraphQLError("Validation error on input form.", {
            extensions: { code: "VALIDATION_ERROR", details: errors },
          });
        }

        // Check if the user does not already exist
        const user = await userRepository.getUserByEmail(email);
        if (user) {
          return new GraphQLError("This email address is already registered.");
        }

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
          verificationUrl: `https://${MARKETPLACE_MAIN_URL}${MARKETPLACE_EMAIL_VERIFICATION_ENDPOINT}?c=${newUser.dataValues.verification_token}`,
        };

        await emailService
          .sendVerificationEmail(newUser.dataValues.email, emailContext)
          .catch((reason) =>
            console.log("(Continuing...) Error sending email: ", reason)
          );

        return newUser.dataValues;
      } catch (e) {
        console.error(e);
        return new GraphQLError(e.message);
      }
    },

    loginOrRegisterWithProvider: (_, { input: { email, password } }) => {
      // Validar token
      // Si existe el usuario, añadir oauth capabilities
      return;
    },

    verifyAccount: async (_, { verification_token }) => {
      try {
        const userFromToken = await userRepository.getUserByVerificationToken(
          verification_token
        );

        if (!userFromToken) {
          return new GraphQLError("Invalid token.", {
            extensions: { code: "INVALID_TOKEN" },
          });
        }

        // Is the same token?
        if (
          userFromToken.dataValues.verification_token !== verification_token
        ) {
          return new GraphQLError("Invalid token.", {
            extensions: { code: "INVALID_TOKEN" },
          });
        }

        // Verify token signature
        const decoded =
          emailVerificationUtils.decodeEmailVerificationToken(
            verification_token
          );

        // Is there an email like the given one?
        if (userFromToken.dataValues.email !== decoded.email) {
          return new GraphQLError("Invalid token.", {
            extensions: { code: "INVALID_TOKEN" },
          });
        }

        if (userFromToken.is_email_verified) {
          return new GraphQLError("Account already verified.");
        }

        // Has it expired?
        if (emailVerificationUtils.isTokenExpired(decoded.exp)) {
          // Send another verification token to the email
          userFromToken.verification_token =
            await emailVerificationUtils.generateEmailVerificationToken({
              id: userFromToken.dataValues.id,
              email: userFromToken.dataValues.email,
            });

          await userFromToken.save();

          // set the context for email verification
          const emailContext = {
            typeOfAction: "creación de cuenta",
            user: {
              first_name: userFromToken.dataValues.first_name,
              last_name: userFromToken.dataValues.last_name,
            },
            verificationUrl: `https://${MARKETPLACE_MAIN_URL}/cuenta/verificar?c=${userFromToken.dataValues.verification_token}`,
          };

          await emailService
            .sendVerificationEmail(userFromToken.dataValues.email, emailContext)
            .catch((reason) =>
              console.log("(Continuing...) Error sending email: ", reason)
            );

          return new GraphQLError(
            "The token is expired. Don't worry, we've sent you another code for you to verify."
          );
        }

        userFromToken.is_email_verified = true;
        await userFromToken.save();

        return userFromToken.dataValues;
      } catch (e) {
        return new GraphQLError(e.message);
      }
    },

    resendAccountVerificationCode: async (_, { email }) => {
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
        verificationUrl: `https://${MARKETPLACE_MAIN_URL}${MARKETPLACE_EMAIL_VERIFICATION_ENDPOINT}?c=${userByEmail.dataValues.verification_token}`,
      };

      await emailService
        .sendVerificationEmail(userByEmail.dataValues.email, emailContext)
        .catch((reason) =>
          console.log("(Continuing...) Error sending email: ", reason)
        );

      return "Email sent";
    },

    setNewPassword: async (
      _,
      { recovery_token, password, repeat_password }
    ) => {
      const validationSchema = AuthValidations.setNewPasswordSchema();

      try {
        const userFromToken = await userRepository.getUserByVerificationToken(
          recovery_token
        );

        if (!userFromToken) {
          return new GraphQLError("Invalid token.", {
            extensions: { code: "INVALID_TOKEN" },
          });
        }

        // Verify token signature
        const decoded =
          emailVerificationUtils.decodeEmailVerificationToken(recovery_token);

        // Is the same token?
        if (userFromToken.dataValues.verification_token !== recovery_token) {
          return new GraphQLError("Invalid token.", {
            extensions: { code: "INVALID_TOKEN" },
          });
        }

        // Is there an email like the given one?
        if (userFromToken.dataValues.email !== decoded.email) {
          return new GraphQLError("Invalid token.", {
            extensions: { code: "INVALID_TOKEN" },
          });
        }

        // Has it expired?
        if (emailVerificationUtils.isTokenExpired(decoded.exp)) {
          return new GraphQLError("The verification token is expired.", {
            extensions: { code: "INVALID_TOKEN" },
          });
        }

        try {
          await validationSchema.validateAsync(
            {
              password,
              repeat_password,
            },
            {
              context: { formName: "NewPasswordForm" },
            }
          );
        } catch (error) {
          const errors = {};
          error.details.forEach((detail) => {
            errors[detail.context.key] = {
              message: detail.message,
            };
          });
          return new GraphQLError("Validation error on input form.", {
            extensions: { code: "VALIDATION_ERROR", details: errors },
          });
        }

        // Hash the plain text password
        userFromToken.password = await passwordsUtils.getHashedPassword(
          password
        );

        // Save changes in the database
        await userFromToken.save();

        return userFromToken.dataValues;
      } catch (e) {
        console.error(e);
        return new GraphQLError(e.message);
      }
    },

    sendPasswordRecoveryEmail: async (_, { email }) => {
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
        typeOfAction: "recuperación de contraseña",
        user: {
          first_name: userByEmail.dataValues.first_name,
          last_name: userByEmail.dataValues.last_name,
        },
        verificationUrl: `https://${MARKETPLACE_MAIN_URL}${MARKETPLACE_PASSWORD_RECOVERY_ENDPOINT}?c=${userByEmail.dataValues.verification_token}`,
      };

      await emailService
        .sendAccountRecoveryEmail(userByEmail.dataValues.email, emailContext)
        .catch((reason) =>
          console.log("(Continuing...) Error sending email: ", reason)
        );

      return "Email sent";
    },
  },
};
