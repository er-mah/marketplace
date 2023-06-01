import { errorResponse, successResponse } from "../../utils/index.js";
import { PublicationRepository } from "../repositories/index.js";

export class PublicationController {
  constructor() {
    this.repository = new PublicationRepository();
  }
  async addVehiclePhotosToBucket(req, res) {

    // Check if authenticated user has access
    const user = req.user;
    const slug = req.params.slug;

    const publication = this.repository.getPublicationBySlug(slug);

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
        const publication = await this.repository.getPublicationBySlug(slug)

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
}
