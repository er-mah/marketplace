import {S3Client} from "@aws-sdk/client-s3";
import {config} from "dotenv";

const AWS_REGION = "us-east-1";
const AWS_RETRIES = 15;

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
 * @type {S3Client}
 */

config()
export const s3 = new S3Client({region: AWS_REGION, maxAttempts: 15});