import { GraphQLError } from "graphql";
import { InfoAutoService } from "../../../services/index.js";
import { uriUtils } from "../../../../utils/index.js";
import {
  PublicationChangeRepository,
  PublicationRepository,
} from "../../../repositories/index.js";

const publicationRepo = new PublicationRepository();
const publicationChangeRepo = new PublicationChangeRepository();

export const publication = {
  Query: {
    searchVehicleModel: async (_parent, { query, page, pageSize }, context) => {
      try {
        return await InfoAutoService.searchModel(query, page, pageSize);
      } catch (error) {
        return new GraphQLError(error);
      }
    },
    getVehicleModelFeatures: async (_parent, { modelId }, context) => {
      try {
        return await InfoAutoService.getModelFeatures(modelId);
      } catch (error) {
        return new GraphQLError(error);
      }
    },
  },
  Mutation: {
    createPublication: async (_parent, { input }, { user }) => {
      // Check if user is authenticated
      if (!user) {
        return new GraphQLError(
          "You must be authenticated to access this resource.",
          { extensions: { code: "AUTENTICATION_ERROR" } }
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
      const newPublication = await publicationRepo.createPublication({
        ...input,
        user_id: user.id,
        info_auto_specs: modelFeatures,
        slug: slug,
      });

      // Register new publication change
      await publicationRepo.setPublicationToPending(newPublication.id);

      // Add user data
      newPublication.owner = user;
      newPublication.changes =
        await publicationChangeRepo.getAllChangesByPublicationId(
          newPublication.id
        );

      return newPublication;
    },

    addInfoToPublicationBySlug: async (_parent, { slug, input }, { user }) => {
      // Check if user is authenticated
      if (!user) {
        return new GraphQLError(
          "You must be authenticated to access this resource.",
          { extensions: { code: "AUTENTICATION_ERROR" } }
        );
      }

      try {
        // Check if publication exists with the given slug
        const publication = await publicationRepo.getPublicationBySlug(slug);

        if (!publication) {
          return;
          new GraphQLError("There is no publication with that slug.");
        }

        // Check if user is an admin. If not, check if the user is the owner of the publication
        if (!user.is_admin) {
          if (publication.user_id !== user.id) {
            // If the user is not an admin or an owner --> return an error response
            return new GraphQLError(
              "You are not authorized to access this resource.",
              { extensions: { code: "RESTRICTED" } }
            );
          }
        }

        try {
          // Add information to publication
          await publicationRepo.updatePublicationById(publication.id, input);

          // Change state to "Publicada"
          await publicationRepo.setPublicationToPosted(publication.id);

          // Get updated publication
          const updatedPublication =
            await publicationRepo.getPublicationBySlug(slug);

          // Show user data and changes
          updatedPublication.changes =
            await publicationChangeRepo.getAllChangesByPublicationId(
              updatedPublication.id
            );
          updatedPublication.owner = user;

          return updatedPublication;
        } catch (e) {
          console.log(e);
          return new GraphQLError("ERROR: " + e);
        }
      } catch (e) {
        console.log(e);
        return new GraphQLError("ERROR: " + e);
      }
    },
  },
};
