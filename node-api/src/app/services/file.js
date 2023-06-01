import sharp from "sharp";
import { s3Client } from "../../config/index.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

export class FileService {
  constructor() {
    this.s3 = s3Client;
  }

  async uploadProfilePicture(file, user) {
    try {
      // Create the filename
      const today = new Date();
      const timestamp = `${today.getDate()}-${
        today.getMonth() + 1
      }-${today.getFullYear()}_${today.getHours()}_${today.getMinutes()}_${today.getSeconds()}`;

      let fileRoute = `ar/marketplace/users/${user.id}/${timestamp}-${file.name}`;

      // Set S3 upload params
      const params = new PutObjectCommand({
        Bucket: AWS_S3_BUCKET_NAME,
        Key: `${fileRoute}`, // La ruta donde se guardará la imagen en S3
        Body: file.buffer,
        ACL: "public-read",
        ContentType: file.mimetype,
      });

      // Upload image to S3
      const response = await this.s3.send(params);

      if (response["$metadata"].httpStatusCode === 200) {
        return `https://${AWS_S3_BUCKET_NAME}/${fileRoute}`;
      }
      return "";
    } catch (e) {
      console.error(e);
    }
  }


  async uploadBanner(file, agencyId) {
    try {
      // Create the filename
      const today = new Date();
      const timestamp = `${today.getDate()}-${
          today.getMonth() + 1
      }-${today.getFullYear()}_${today.getHours()}_${today.getMinutes()}_${today.getSeconds()}`;

      let fileRoute = `ar/marketplace/agencies/${agencyId}/${timestamp}-${file.name}`;

      // Set S3 upload params
      const params = new PutObjectCommand({
        Bucket: AWS_S3_BUCKET_NAME,
        Key: `${fileRoute}`, // La ruta donde se guardará la imagen en S3
        Body: file.buffer,
        ACL: "public-read",
        ContentType: file.mimetype,
      });

      // Upload image to S3
      const response = await this.s3.send(params);

      if (response["$metadata"].httpStatusCode === 200) {
        return `https://${AWS_S3_BUCKET_NAME}/${fileRoute}`;
      }
      return "";
    } catch (e) {
      console.error(e);
    }
  }

  async cropProfilePicture(file) {
    return await sharp(file)
      .resize({
        width: 250,
        height: 250,
        fit: "cover",
        position: "center",
      })
      .toBuffer();
  }

  async cropBanner(file) {
    return await sharp(file)
      .resize({
        width: 970,
        height: 250,
        fit: "cover",
        position: "center",
      })
      .toBuffer();
  }
}
