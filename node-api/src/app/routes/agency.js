import express from "express";
import { passport } from "../../config/index.js";
import { AgencyController } from "../controllers/index.js";

export const agencyRouter = express.Router();
const controller = new AgencyController();

agencyRouter.post(
  "/agency/:id/banner/upload",
  passport.authenticate("jwt", { session: false }),
  controller.addAgencyBannerToBucket
);
