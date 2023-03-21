import { GraphQLError } from "graphql";

import { LocalityModel, UserModel } from "../../models/index.js";
import { passwordsUtils } from "../../../helpers/index.js";
import {passportMdw} from "../../../middlewares/index.js";

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
              new GraphQLError(
                "There is already a user with the same email address."
              )
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
    login: async (_, { loginInput: { email, password } }, { req }) => {
      return new Promise((resolve, reject) => {
        passportMdw.authenticate("local", {},(err, user) => {
          if (err) {
            reject(new GraphQLError(err));
          }
          if (!user) {
            reject(new GraphQLError("Invalid credentials"));
          }

          req.login(user, (err) => {
            if (err) {
              reject(new GraphQLError(err));
            }
            resolve(user);
          });
        });
      });
    },
  },
};
