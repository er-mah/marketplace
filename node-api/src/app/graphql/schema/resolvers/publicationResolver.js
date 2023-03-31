import {PublicationChangesModel, PublicationModel, PublicationStateModel,} from "../../../models/index.js";
import {GraphQLError} from "graphql";
import {InfoAutoService} from "../../../services/index.js";
import {uriUtils} from "../../../../helpers/index.js";

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
  Mutation: {
    createPublication: async (_parent, { input }, { user }) => {
      // Check if user is authenticated
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "Debe estar autenticado para acceder a este recurso.",
            { extensions: { code: "AUTENTICATION_ERROR" } }
          )
        );
      }

      const modelFeatures = await InfoAutoService.getModelFeatures(
        input.vehicle_codia_id
      );

      const slug = uriUtils.generateSlug(
        input.vehicle_brand + "-" + input.vehicle_version
      );

      const newPublication = await PublicationModel.create({
        ...input,
        user_id: user.id,
        info_auto_specs: modelFeatures,
        slug: slug,
      });

      const newPublicationChange = await PublicationChangesModel.create({
        state_id: 1, // Pendiente
        publication_id: newPublication.id,
        active: true,
      });

      newPublicationChange.state = await PublicationStateModel.findByPk(newPublicationChange.state_id);

      newPublication.owner = user;
      newPublication.changes = [newPublicationChange];

      return newPublication;
    },
  },
};
