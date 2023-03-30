import { GraphQLError } from "graphql";

import { UserModel } from "../../../models/index.js";
import { jwtUtils, passwordsUtils } from "../../../../helpers/index.js";

export const auth = {
  Mutation: {
    register: async (
      _,
      { input: { first_name, last_name, email, password } }
    ) => {
      try {
        // Check if the user does not already exist
        await UserModel.findOne({ where: { email: email } }).then((user) => {
          if (user) {
            return Promise.reject(
              new GraphQLError("This email address is already registered.")
            );
          }
        });

        // Hash the plain text password
        const pwdHash = await passwordsUtils.getHashedPassword(password);

        // Store new user in the database
        return await UserModel.create({
          email,
          first_name,
          last_name,
          password: pwdHash,
        });
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
