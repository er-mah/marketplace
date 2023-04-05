import express from "express";
import { errorResponse, successResponse } from "../../utils/index.js";
import { PublicationModel } from "../models/index.js";
import { passport, uploadPublicationPhotosToS3 } from "../../config/index.js";
import { PublicationService } from "../services/index.js";
import {GraphQLError} from "graphql/index.js";

export const publicationRouter = express.Router();

publicationRouter.post(
  "/publication/:slug/photos/upload",
  passport.authenticate("jwt", { session: false }),
  uploadPublicationPhotosToS3.array("photos", 20),
  async (req, res, next) => {
    // Check if authenticated user has access

    const user = req.user;
    const slug = req.params.slug;

    const publication = await PublicationService.getPublicationBySlug(slug);

      if (!publication) {
          return res
              .status(404)
              .send(errorResponse("There is no publication with that slug."));
      }

    // Check if user is an admin. If not, check if the user is the owner of the publication
    if (!user.is_admin) {
      if (publication.user_id !== user.id) {
        return res
          .status(403)
          .send(errorResponse("You cannot make changes to this publication."));
      }
    }

    if (req.files) {
      // Upload was successful
      let locations = [];

      // Store file locations in array
      req.files.forEach((file) => {
        locations.push(file.location);
      });

      // Store urls in database
      try {
        const publication = await PublicationModel.findOne({
          where: { slug },
        });

        // Check if publication exists
        if (!publication) {
          return res
            .status(500)
            .send(errorResponse("Error finding post with slug:" + slug));
        }

        // Update publication photos_urls field with uploaded file locations
        publication.photos_urls = locations;
        await publication.save();
      } catch (error) {
        // Error finding or saving publication to database
        return res
          .status(500)
          .send(errorResponse(`Error finding post with slug ${slug}:`));
      }

      // Send success response with uploaded file locations
      return res.send(
        successResponse(
          "Successfully uploaded " + req.files.length + " files!",
          { photosUrl: locations }
        )
      );
    } else {
      return res
        .status(500)
        .send(
          errorResponse("Error uploading files. The file path might be wrong.")
        );
    }
  }
);
