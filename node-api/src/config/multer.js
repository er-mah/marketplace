import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

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


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "NOMBRE_DE_TU_BUCKET",
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});
