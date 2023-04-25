import express from "express";
import { errorResponse, successResponse } from "../../utils/index.js";
import { PublicationModel } from "../models/index.js";
import { passport, uploadPublicationPhotosToS3 } from "../../config/index.js";

import { PublicationController } from "../controllers/index.js";

export const publicationRouter = express.Router();
const controller = new PublicationController();

publicationRouter.post(
  "/publication/:slug/photos/upload",
  passport.authenticate("jwt", { session: false }),
  uploadPublicationPhotosToS3.array("photos", 20),
  controller.addVehiclePhotosToBucket
);
