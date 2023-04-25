import express from "express";
import { passport, uploadPublicationPhotosToS3 } from "../../config/index.js";
import { PublicationController } from "../controllers/index.js";

export const userRouter = express.Router();
const controller = new PublicationController();

userRouter.post(
  "/publication/:slug/photos/upload",
  passport.authenticate("jwt", { session: false }),
  uploadPublicationPhotosToS3.array("photos", 20),
  controller.addVehiclePhotosToBucket
);
