import {} from "../../models/index.js";
import { GraphQLError } from "graphql";
import { InfoAutoService } from "../../services/index.js";

export const publication = {
  Query: {
    searchVehicleModel: async (_parent, { query, page, pageSize }, context) => {
      try {
        return await InfoAutoService.searchModel(query, page, pageSize);
      } catch (error) {
        return Promise.reject(new GraphQLError(error));
      }
    },
    getVehicleModelFeatures: async (_parent, { modelId }, context) => {
      try {
        return await InfoAutoService.getModelFeatures(modelId);
      } catch (error) {
        return Promise.reject(new GraphQLError(error));
      }
    },
  },
};
