import {
  PublicationChangesModel,
  PublicationModel,
  PublicationStateModel,
} from "../../../models/index.js";
import { GraphQLError } from "graphql";
import {
  InfoAutoService,
  PublicationChangeService,
  PublicationService,
} from "../../../services/index.js";
import { uriUtils } from "../../../../helpers/index.js";

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
            "You must be authenticated to access this resource.",
            { extensions: { code: "AUTENTICATION_ERROR" } }
          )
        );
      }

      // Get vehicle features
      const modelFeatures = await InfoAutoService.getModelFeatures(
        input.vehicle_codia_id
      );

      // Generate publication slug
      const slug = uriUtils.generateSlug(
        input.vehicle_brand + "-" + input.vehicle_version
      );

      // Add new publication
      const newPublication = await PublicationService.addNewPublication({
        ...input,
        user_id: user.id,
        info_auto_specs: modelFeatures,
        slug: slug,
      });

      // Register new publication change
      await PublicationService.setPublicationToPending(newPublication.id);

      // Add user data
      newPublication.owner = user;
      newPublication.changes =
        await PublicationChangeService.getAllChangesByPublicationId(
          newPublication.id
        );

      return newPublication;
    },

    addInfoToPublicationBySlug: async (_parent, { slug, input }, { user }) => {
      // Check if user is authenticated
      if (!user) {
        return Promise.reject(
          new GraphQLError(
            "You must be authenticated to access this resource.",
            { extensions: { code: "AUTENTICATION_ERROR" } }
          )
        );
      }

      try {
        // Check if publication exists with the given slug
        const publication = await PublicationService.getPublicationBySlug(slug);

        if (!publication) {
          return Promise.reject(
            new GraphQLError("There is no publication with that slug.")
          );
        }

        // Check if user is an admin. If not, check if the user is the owner of the publication
        if (!user.is_admin) {
          if (publication.user_id !== user.id) {
            // If the user is not an admin or an owner --> return an error response
            return Promise.reject(
              new GraphQLError(
                "You are not authorized to access this resource.",
                { extensions: { code: "RESTRICTED" } }
              )
            );
          }
        }

        try {
          // Add information to publication
          await PublicationService.updatePublication(publication, input);

          // Change state to "Publicada"
          await PublicationService.setPublicationToPosted(publication.id);

          // Get updated publication
          const updatedPublication = await PublicationService.getPublicationBySlug(slug);

          // Show user data and changes
          updatedPublication.changes =
            await PublicationChangeService.getAllChangesByPublicationId(
              updatedPublication.id
            );
          updatedPublication.owner = user;

          return updatedPublication;
        } catch (e) {
          console.log(e)
          return Promise.reject(new GraphQLError("ERROR: " + e));
        }
      } catch (e) {
        console.log(e)
        return Promise.reject(new GraphQLError("ERROR: " + e));
      }
    },
  },
};
