import express from "express";
import { uploadPublicationPhotosToS3 } from "../../config/index.js";
import { errorResponse, successResponse } from "../../utils/index.js";
import { PublicationModel } from "../models/index.js";

export const publicationRouter = express.Router();

publicationRouter.post(
  "/publication/:slug/photos/upload",
  uploadPublicationPhotosToS3.array("photos", 20),
  async (req, res) => {
    const slug = req.params.slug;

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
          res.send(errorResponse("Error finding post with slug:" + slug));
        }

        // Update publication photos_urls field with uploaded file locations
        publication.photos_urls = locations;
        await publication.save();
      } catch (error) {
        // Error finding or saving publication to database
        res.send(errorResponse(`Error finding post with slug ${slug}:`));
      }

      // Send success response with uploaded file locations
      res.send(
        successResponse(
          "Successfully uploaded " + req.files.length + " files!",
          { photosUrl: locations }
        )
      );
    } else {
      res.send(errorResponse("Error uploading files."));
    }
  }
);
