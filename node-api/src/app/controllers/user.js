import { errorResponse, successResponse } from "../../utils/index.js";
import { UserRepository } from "../repositories/index.js";
import { FileService } from "../services/index.js";

export class UserController {
  constructor() {
    this.repository = new UserRepository();
  }
  async addProfilePictureToBucket(req, res) {
    try {
      const fileService = new FileService();

      if (!req.user) {
        return res
          .status(403)
          .send(errorResponse("You must be authenticated."));
      }

      const user = req.user;

      if (!req.files.profile) {
        return res
          .status(403)
          .send(errorResponse(`You have not provided any files.`));
      }

      if (
        req.files.profile.mimetype !== "image/jpeg" &&
        req.files.profile.mimetype !== "image/png"
      ) {
        return res
          .status(403)
          .send(
            errorResponse(
              `The profile picture extension must be .jpeg or .png.`
            )
          );
      }
      // Redifine file
      req.files.profile.buffer = await fileService.cropProfilePicture(
        req.files.profile.data
      );

      const url = await fileService.uploadProfilePicture(
        req.files.profile,
        user
      );

      if (url === "") {
        return res
          .status(500)
          .send(errorResponse(`Error uploading profile picture`));
      }

      user.profile_image = url
      user.save()

      return res
        .status(200)
        .send(
          successResponse(
            `Picture successfully uploaded.`,
            { url: url }
          )
        );
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .send(errorResponse(`Error uploading profile picture`, e.message));
    }
  }
}
