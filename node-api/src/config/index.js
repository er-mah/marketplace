import { expressSessionInstance } from "./expressSession.js";
import { passport, options as jwtOpts } from "./passport.js";
import { s3Client } from "./aws.js";
import { uploadPublicationPhotosToS3 } from "./multer.js";

export {
  passport,
  expressSessionInstance,
  jwtOpts,
  s3Client,
  uploadPublicationPhotosToS3,
};
