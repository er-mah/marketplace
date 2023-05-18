import { AgencyModel, UserModel } from "../../../models/index.js";
import { GraphQLError } from "graphql";
import {
  AgencyRepository,
  LocalityRepository,
} from "../../../repositories/index.js";
import { format } from "date-fns";

const localityRepo = new LocalityRepository();
const agencyRepo = new AgencyRepository();

export const agency = {
  Agency: {
    createdAt: (parent) =>
      format(new Date(parseInt(parent.createdAt)), "dd/MM/yyyy HH:mm:ss"),
    updatedAt: (parent) =>
      format(new Date(parseInt(parent.updatedAt)), "dd/MM/yyyy HH:mm:ss"),
    deletedAt: (parent) =>
      format(new Date(parseInt(parent.deletedAt)), "dd/MM/yyyy HH:mm:ss"),
  },
  Query: {
    getAgencyById: async (_parent, { args: { id } }, context) => {
      try {
        const agency = await AgencyModel.findByPk(id);
        if (!agency) {
          return new GraphQLError(
            `There are no departments with the ID: ${id}`
          );
        }
        return agency;
      } catch (error) {
        return new GraphQLError(`Error looking for agency: ${error.message}`);
      }
    },
    searchAgencies: async (_parent, { query }) => {
      try {
        return agencyRepo.searchAgenciesByName(query);
      } catch (error) {
        return new GraphQLError(`Error looking for agency: ${error.message}`);
      }
    },
    getAllAgencies: async () => {
      try {
        const agencies = await AgencyModel.findAll({
          include: [{ model: UserModel }],
        });

        if (!agencies || agencies.length === 0) {
          return [];
        }

        return await Promise.all(
          agencies.map(async (agency) => {
            const agencyJSON = agency.toJSON();

            agencyJSON.representatives = agency.Users.map((representative) =>
              representative.toJSON()
            );
            return agencyJSON;
          })
        );
      } catch (error) {
        return new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createAgency: async (
      _parent,
      { input: { name, address, email, phone, locality_id, zip_code } },
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

        if (user.is_agency_representative && user.agency_id) {
          return new GraphQLError("You already are an agency representative.", {
            extensions: { code: "INPUT_ERROR" },
          });
        }

        const locality = await localityRepo.getLocalityById(locality_id);
        if (!locality) {
          return new GraphQLError(
            "There are not any localities that match the given id.",
            {
              extensions: { code: "INPUT_ERROR" },
            }
          );
        }

        const existingAgency = await agencyRepo.getAgencyByEmail(email);
        if (existingAgency) {
          return new GraphQLError("Email is already being used.", {
            extensions: { code: "INPUT_ERROR" },
          });
        }

        const newAgency = await agencyRepo.createAgency(
          name,
          address,
          email,
          phone,
          locality_id,
          zip_code
        );

        user.is_agency_representative = true;
        user.agency_id = newAgency.id;
        await user.save();

        const agency = await agencyRepo.getAgencyById(newAgency.id);
        agency.representatives = agency.Users.map((rep) => rep.toJSON());

        return agency;
      } catch (e) {
        console.error(e);
        return new GraphQLError("Could not store information: " + e.message, {
          extensions: { code: "SERVER_ERROR" },
        });
      }
    },
  },
};
