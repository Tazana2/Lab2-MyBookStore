import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";
dotenv.config();

const config = {
  region: process.env.AWS_REGION || "us-east-1",
};

// Si es DynamoDB Local, incluir endpoint y credenciales dummy
if (process.env.DYNAMODB_ENDPOINT) {
  config.endpoint = process.env.DYNAMODB_ENDPOINT;
  config.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "dummy",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "dummy",
  };
}

const ddbClient = new DynamoDBClient(config);

export default ddbClient;