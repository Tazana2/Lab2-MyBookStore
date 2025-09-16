import dotenv from "dotenv";
import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

dotenv.config();

const TABLE_NAME = process.env.TABLE_NAME || "tb_books";

const clientConfig = {
  region: process.env.AWS_REGION || "us-east-1",
};

// Si estás usando DynamoDB Local en dev, define DYNAMODB_ENDPOINT en .env
if (process.env.DYNAMODB_ENDPOINT) {
  clientConfig.endpoint = process.env.DYNAMODB_ENDPOINT;
}

const ddbClient = new DynamoDBClient(clientConfig);

async function createTable() {
  const params = {
    TableName: TABLE_NAME,
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "S" }, // id: string
    ],
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" }, // Partition key
    ],
    // Usamos on-demand para no tener que manejar throughput en dev/prod
    BillingMode: "PAY_PER_REQUEST",
    // Opcional: uncomment si quieres provisioned throughput instead:
    // ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 }
  };

  try {
    console.log(`Creando tabla '${TABLE_NAME}'...`);
    const command = new CreateTableCommand(params);
    const result = await ddbClient.send(command);
    console.log("Tabla creada:", result.TableDescription?.TableName);
    console.log("ARN:", result.TableDescription?.TableArn);
    process.exit(0);
  } catch (err) {
    // Si la tabla ya existe, AWS lanza ResourceInUseException
    if (err?.name === "ResourceInUseException" || err?.code === "ResourceInUseException") {
      console.log(`La tabla '${TABLE_NAME}' ya existe. Nada que hacer.`);
      process.exit(0);
    }
    console.error("Error creando la tabla:", err);
    process.exit(1);
  }
}

createTable();