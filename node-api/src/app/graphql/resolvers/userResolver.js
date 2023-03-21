import { GraphQLError } from "graphql";

import { LocalityModel, UserModel } from "../../models/index.js";
import { passwordsUtils } from "../../../helpers/index.js";

export const user = {
  BasicUser: {
    locality: (user) => user.Locality,
  },

  Mutation: {
    registerUser: async (_, { input }) => {
      try {
        const hashedPassword = await passwordsUtils.getHashedPassword(
          input.password
        );

        // check unique user email
        await UserModel.findOne({ where: { email: input.email } }).then(
          (user) => {
            if (user) {
              return Promise.reject(
                new GraphQLError(
                  "There is already a user with the same email address."
                )
              );
            }
          }
        );

        //check locality
        const locality = await LocalityModel.findOne({
          where: { id: input.locality_id },
        }).then((locality) => {
          if (!locality) {
            return Promise.reject(
              new GraphQLError("There is no locality with that ID.")
            );
          }
          return locality;
        });

        const clientType = {
          is_agency_representative: false,
          agency_id: null,
        };
        if (input.is_agency_representative === true) {
          if (!input.agency_id) {
            return Promise.reject(
              new GraphQLError("agency_id not specified")
            );
          } else {
            clientType.is_agency_representative = true;
            clientType.agency_id = input.agency_id;
          }
        }

        const newUser = await UserModel.create(
          {
            ...input,
            password: hashedPassword,
            is_account_disabled: false,
            is_email_verified: false,
            is_agency_representative: clientType.is_agency_representative,
            agency_id: clientType.agency_id,
          },
          {
            include: [{ model: LocalityModel }],
          }
        );

        newUser.dataValues.locality = locality.dataValues;
        return newUser.dataValues;

      } catch (e) {
        return Promise.reject(new GraphQLError(e.message));
      }
    },
  },
};
