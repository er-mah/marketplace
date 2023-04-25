import { GraphQLError } from "graphql";

import { LocalityModel, UserModel } from "../../../models/index.js";
import { passwordsUtils } from "../../../../utils/index.js";
import { format } from "date-fns";
import { EmailService } from "../../../services/email.js";
import { emailVerificationUtils } from "../../../../utils/emailVerification.js";

export const user = {
  User: {
    createdAt: (parent) =>
      format(new Date(parent.createdAt), "dd/MM/yyyy HH:mm:ss"),
    updatedAt: (parent) =>
      format(new Date(parent.updatedAt), "dd/MM/yyyy HH:mm:ss"),
  },

  BasicUser: {
    locality: (user) => user.Locality,
  },

  Query: {
    me: async (_parent, { id }, { user }) => {
      // Check if user is authenticated
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "You must be authenticated to access this resource.",
            { extensions: { code: "AUTENTICATION_ERROR" } }
          )
        );
      }
      return user;
    },
  },

  Mutation: {
    // TODO: delete it
    _register: async (_, { input }) => {
      const emailService = new EmailService();

      try {
        // Generate hashed password
        const hashedPassword = await passwordsUtils.getHashedPassword(
          input.password
        );

        // Check if user email is unique
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

        /*
        
        
        TODO: Change this to additional resolvers
        // Check if locality exists
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

        // By default, a user is not a representative
        const clientType = {
          is_agency_representative: false,
          agency_id: null,
        };


        if (input.is_agency_representative === true) {
          if (!input.agency_id) {
            return Promise.reject(new GraphQLError("agency_id not specified"));
          } else {
            clientType.is_agency_representative = true;
            clientType.agency_id = input.agency_id;
          }
        }
        
        
        

        const newUser = await UserModel.create(
          {
            //is_agency_representative: clientType.is_agency_representative,
            //agency_id: clientType.agency_id,
          },
          
          
          
        newUser.dataValues.locality = locality.dataValues;
         */

        const newUser = await UserModel.create(
          {
            ...input,
            first_name: input.first_name,
            last_name: input.last_name,
            email: input.email,
            password: hashedPassword,
          },
          {
            include: [{ model: LocalityModel }],
          }
        );

        newUser.verification_token =
          await emailVerificationUtils.generateEmailVerificationToken({
            id: newUser.dataValues.id,
            email: newUser.dataValues.email,
          });

        await newUser.save();

        /*
        // set the context for email verification
        const emailContext = {
          typeOfAction: "creación de cuenta",
          user: {
            first_name: newUser.dataValues.first_name,
            last_name: newUser.dataValues.last_name,
          },
          verificationUrl: `https://${MARKETPLACE_MAIN_URL}/cuenta/verificar$c=${newUser.dataValues.verification_token}`,
        };

        await emailService.sendVerificationEmail(
          newUser.dataValues.email,
          emailContext
        );

         */

        return Promise.resolve(newUser.dataValues);
      } catch (e) {
        return Promise.reject(new GraphQLError(e.message));
      }
    },
  },
};
