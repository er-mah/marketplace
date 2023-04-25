import { AgencyModel, UserModel } from "../../../models/index.js";
import { GraphQLError } from "graphql";

export const agency = {
  Query: {
    getAgencyById: async (_parent, { args: { id } }, context) => {
      try {
        const agency = await AgencyModel.findByPk(id);
        if (!agency) {
          return Promise.reject(
            new GraphQLError(`There are no departments with the ID: ${id}`)
          );
        }
        return agency;
      } catch (error) {
        return Promise.reject(
          new GraphQLError(`Error looking for agency: ${error.message}`)
        );
      }
    },
    getAllAgencies: async () => {
      try {
        const agencies = await AgencyModel.findAll({
          include: [{ model: UserModel }],
        });
        if (!agencies || agencies.length === 0) {
          return Promise.reject(
            new GraphQLError("There are no registered agencies.")
          );
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
        return Promise.reject(new GraphQLError(error.message));
      }
    },
  },
};
