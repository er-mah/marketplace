import express from "express";
import { passport } from "../../config/index.js";
import { UserController } from "../controllers/index.js";

export const userRouter = express.Router();
const controller = new UserController();

userRouter.post(
  "/me/profile-picture/upload",
  passport.authenticate("jwt", { session: false }),
  controller.addProfilePictureToBucket
);
