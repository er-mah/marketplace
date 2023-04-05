import multer from "multer";
import multerS3 from "multer-s3";
import { s3Client } from "./aws.js";
import { config } from "dotenv";

config();

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
/**
 *
 * multer: adds a body object and a file or files object to the request object.
   The body object contains the values of the text fields of the form, the file
   or files object contains the files uploaded via the form.

 * multer-s3: is mostly an integration piece for existing code samples from Multer's storage engine
   documentation with a call to S3 as the substitution piece for file system.
   - 3.x.x releases of multer-s3 use AWS JavaScript SDK v3. Specifically, it uses the
   Upload class from @aws-sdk/lib-storage which in turn calls the modular S3Client.
 */

export const uploadPublicationPhotosToS3 = multer({
  storage: multerS3({
    limits: { files: 20 },
    // S3 bucket to store files
    s3: s3Client,
    bucket: AWS_S3_BUCKET_NAME,
    // access level of the files --> publicly accessible
    acl: "public-read",
    key: async (req, file, cb) => {
      // Verificar si el path del archivo es correcto
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(
          new Error("Only files with JPG, JPEG or PNG format are allowed.")
        );
      }

      // Get the publication slug from the request parameters
      const publicationSlug = req.params.slug;
      // Generate a random number between 1 and 10000
      const randomNumber = Math.floor(Math.random() * 10000) + 1;
      // Get the current timestamp and convert it to a string
      const today = new Date();
      const timestamp = `${today.getDate()}-${
        today.getMonth() + 1
      }-${today.getFullYear()}`;
      // Get extension
      const ext = file.originalname.split(".").pop();

      // Create the filename by combining the timestamp, publication slug, and random number
      let filename = `ar/marketplace/publications/${timestamp}-${publicationSlug}-${randomNumber}.${ext}`;

      // Check if the filename already exists in S3
      await s3Client.headObject({ Key: filename }, function (err, metadata) {
        if (!err) {
          // If the file already exists, generate another random number
          const randomNumber = Math.floor(Math.random() * 10000) + 1;
          filename = `${timestamp}-${publicationSlug}-${randomNumber}.${ext}`;
        }
        cb(null, filename);
      });

      cb(null, filename);
    },
  }),
});
