import { AgencyModel, UserModel } from "../../models/index.js";
import { GraphQLError } from "graphql";

export const agency = {
  Query: {
    getAllAgencies: async () => {
      try {
        const agencies = await AgencyModel.findAll({
          include: [{ model: UserModel }],
        });
        if (!agencies || agencies.length === 0) {
            return Promise.reject(new GraphQLError("There are no registered agencies."));
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
