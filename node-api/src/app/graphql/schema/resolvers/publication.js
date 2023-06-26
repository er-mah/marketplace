import { GraphQLError } from "graphql";
import { uriUtils } from "../../../../utils/index.js";
import {
  PublicationChangeRepository,
  PublicationRepository,
} from "../../../repositories/index.js";
import { CCAService } from "../../../services/index.js";

const publicationRepo = new PublicationRepository();
const publicationChangeRepo = new PublicationChangeRepository();

export const publication = {
  Query: {
    getVehicleBrands: async () => {
      try {
        return await CCAService.getAllBrands();
      } catch (error) {
        return new GraphQLError(error);
      }
    },
    getVehicleModelsByBrandName: async (_parent, { brand }) => {
      try {
        return await CCAService.getModelsByBrandName(brand);
      } catch (error) {
        return new GraphQLError(error);
      }
    },
    getVehicleYearsByModelID: async (_parent, { modelId }) => {
      try {
        return await CCAService.getYearsByModelID(modelId);
      } catch (error) {
        return new GraphQLError(error);
      }
    },
    getVehicleVersionsByYear: async (_parent, { year, modelId }) => {
      try {
        return await CCAService.getModelVersionsByYear(year, modelId);
      } catch (error) {
        return new GraphQLError(error);
      }
    },
  },
  Mutation: {
    createPublication: async (_parent, { input }, { user }) => {
      try {
        // Check if user is authenticated
        if (!user) {
          return new GraphQLError(
            "You must be authenticated to access this resource.",
            { extensions: { code: "AUTENTICATION_ERROR" } }
          );
        }

        // Generate publication slug
        const slug = uriUtils.generateSlug(
          input.vehicle_brand + "-" + input.vehicle_version
        );

        // Add new publication
        const newPublication = await publicationRepo.createPublication({
          ...input,
          user_id: user.id,
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
      } catch (error) {
        console.error(error);
        return new GraphQLError(error);
      }
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
          const updatedPublication = await publicationRepo.getPublicationBySlug(
            slug
          );

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
