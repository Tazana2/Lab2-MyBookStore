import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";
dotenv.config();

// Configuración base: región. Credenciales se resuelven automáticamente (Instance Profile en EC2 o perfil local)
const baseConfig = {
  region: process.env.AWS_REGION || "us-east-1",
};

// Solo usar endpoint si explícitamente se define (ej. desarrollo con DynamoDB Local)
if (process.env.DYNAMODB_ENDPOINT) {
  baseConfig.endpoint = process.env.DYNAMODB_ENDPOINT;
}

const lowLevel = new DynamoDBClient(baseConfig);
const ddb = DynamoDBDocumentClient.from(lowLevel);

export default ddb;