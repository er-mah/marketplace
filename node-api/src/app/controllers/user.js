import { errorResponse, successResponse } from "../../utils/index.js";
import { UserRepository} from "../repositories/index.js";

export class PublicationController {
  constructor() {
    this.repository = new UserRepository();
  }
  async addProfilePictureToBucket(req, res) {

    const user = req.user;

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
