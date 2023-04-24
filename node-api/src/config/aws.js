import { S3 } from "@aws-sdk/client-s3";
import { config } from "dotenv";

config();

/**
 * The AWS SDK is modulized by clients and commands.
 * To send a request, you only need to import the S3Client and the commands you need.
 *
 * To send a request, you:
 * Initiate client with configuration (e.g. credentials, region).
 * Initiate command with input parameters.
 * Call send operation on client with command object as input.
 * If you are using a custom http handler, you may call destroy() to close open connections.
 *
 * @type {S3}
 */

const AWS_REGION = process.env.AWS_REGION;
const AWS_RETRIES = process.env.AWS_RETRIES;
const AWS_S3_ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID;
const AWS_S3_SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY;

export const s3Client = new S3({
  region: AWS_REGION,
  maxAttempts: parseInt(AWS_RETRIES),
  credentials: {
    accessKeyId: AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
  },
});

