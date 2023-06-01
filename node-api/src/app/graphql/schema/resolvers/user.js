import { GraphQLError } from "graphql";
import { format } from "date-fns";
import {
  UserRepository,
  LocalityRepository,
  AgencyRepository,
} from "../../../repositories/index.js";

const userRepo = new UserRepository();
const localityRepo = new LocalityRepository();
const agencyRepo = new AgencyRepository();

export const user = {
  User: {
    createdAt: (parent) =>
      format(new Date(parent.createdAt), "dd/MM/yyyy HH:mm:ss"),
    updatedAt: (parent) =>
      format(new Date(parent.updatedAt), "dd/MM/yyyy HH:mm:ss"),
    deletedAt: (parent) =>
      format(new Date(parent.deletedAt), "dd/MM/yyyy HH:mm:ss"),
  },

  BasicUser: {
    locality: (user) => user.Locality,
  },

  Query: {
    me: async (_parent, { id }, { user }) => {

      try {
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
      } catch (e) {
        console.error(e);
        return new GraphQLError("Could not store information: " + e.message, {
          extensions: { code: "SERVER_ERROR" },
        });
      }

    },
  },

  Mutation: {
    completePersonalInformation: async (
      _,
      {
        input: {
          address,
          phone,
          dni,
          is_agency_representative,
          agency_id,
          locality_id,
        },
      },
      { user }
    ) => {
      try {
        // Check if user is authenticated
        if (!user) {
          return new GraphQLError(
            "You must be authenticated to access this resource.",
            { extensions: { code: "AUTENTICATION_ERROR" } }
          );
        }

        if (user.has_provided_additional_data) {
          return new GraphQLError("You have already completed this step.", {
            extensions: { code: "STEP_COMPLETE" },
          });
        }

        // Check if locality id is valid
        const locality = await localityRepo.getLocalityById(locality_id);
        if (!locality) {
          return new GraphQLError(
            "There are not any localities that match the given id.",
            {
              extensions: { code: "INPUT_ERROR" },
            }
          );
        }

        // Check if agency id is valid
        if (is_agency_representative) {
          if (!agency_id || agency_id === "") {
            return new GraphQLError("You must specify a valid agency_id.", {
              extensions: { code: "INPUT_ERROR" },
            });
          }
        }

        // Check if agency exists
        if (agency_id !== "") {
          const agency = await agencyRepo.getAgencyById(agency_id);

          if (!agency) {
            return new GraphQLError(
              "There are not any agencies that match the given id.",
              {
                extensions: { code: "INPUT_ERROR" },
              }
            );
          }
        }

        const updatedUser = await userRepo.updateUser(user.id, {
          address,
          phone,
          dni,
          is_agency_representative,
          ...(agency_id !== "" && { agency_id }),   // Assure the agency_id is !== ""
          locality_id,
        });

        updatedUser.has_provided_additional_data = true;
        await updatedUser.save();

        return updatedUser;
      } catch (e) {
        console.error(e);
        return new GraphQLError("Could not store information: " + e.message, {
          extensions: { code: "SERVER_ERROR" },
        });
      }
    },
  },
};
