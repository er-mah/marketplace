import { errorResponse, successResponse } from "../../utils/index.js";
import {AgencyRepository, UserRepository} from "../repositories/index.js";
import { FileService } from "../services/index.js";

const fileService = new FileService();
const agencyRepo = new AgencyRepository()

export class AgencyController {
  constructor() {
    this.repository = new UserRepository();
  }
  async addAgencyBannerToBucket(req, res) {

    try {

      if (!req.user) {
        return res
          .status(403)
          .send(errorResponse("You must be authenticated."));
      }

      const user = req.user;

      const agencyId = req.params.id;
      const agency = await agencyRepo.getAgencyById(agencyId)
      if (!agency) {
        return res
            .status(404)
            .send(errorResponse("Agency not found."));
      }

      if (user.agency_id !== agencyId || !user.agency_id || !user.is_agency_representative) {
        return res
            .status(403)
            .send(errorResponse("You have no rights to make changes."));
      }


      if (!req.files.agency_banner) {
        return res
          .status(403)
          .send(errorResponse(`You have not provided any files.`));
      }

      if (
        req.files.agency_banner.mimetype !== "image/jpeg" &&
        req.files.agency_banner.mimetype !== "image/png"
      ) {
        return res
          .status(403)
          .send(
            errorResponse(
              `The banner image must be .jpeg or .png.`
            )
          );
      }
      // Redifine file
      req.files.agency_banner.buffer = await fileService.cropBanner(
        req.files.agency_banner.data
      );

      const url = await fileService.uploadBanner(
        req.files.agency_banner,
        agencyId
      );

      if (url === "") {
        return res
          .status(500)
          .send(errorResponse(`Error uploading banner.`));
      }

      agency.banner_image = url;
      agency.save();

      return res
        .status(200)
        .send(successResponse(`Picture successfully uploaded.`, { url: url }));
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .send(errorResponse(`Error uploading agency banner`, e.message));
    }
  }
}
