// scripts/seed.js
import dotenv from "dotenv";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

dotenv.config();

const TABLE = process.env.TABLE_NAME || "tb_books";

const clientConfig = {
  region: process.env.AWS_REGION || "us-east-1",
};
if (process.env.DYNAMODB_ENDPOINT)
  clientConfig.endpoint = process.env.DYNAMODB_ENDPOINT;

const client = new DynamoDBClient(clientConfig);
const ddb = DynamoDBDocumentClient.from(client);

const sampleBooks = [
  {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2008,
    isbn: "9780132350884",
    imageUrl: "/images/1.jpg"
  },
  {
    id: "2",
    title: "The Pragmatic Programmer",
    author: "Andy Hunt & Dave Thomas",
    year: 1999,
    isbn: "9780201616224",
    imageUrl: "/images/2.jpg"
  },
  {
    id: "3",
    title: "Design Patterns",
    author: "Erich Gamma et al.",
    year: 1994,
    isbn: "9780201633610",
    imageUrl: "/images/3.jpg"
  },
  {
    id: "4",
    title: "Refactoring",
    author: "Martin Fowler",
    year: 1999,
    isbn: "9780201485677",
    imageUrl: "/images/4.jpg"
  },
  {
    id: "5",
    title: "You Don't Know JS (ES6+)",
    author: "Kyle Simpson",
    year: 2020,
    isbn: "9781491904244",
    imageUrl: "/images/5.jpg"
  },
];

async function seed() {
  try {
    console.log(
      `Insertando ${sampleBooks.length} items en la tabla '${TABLE}'...`
    );
    for (const item of sampleBooks) {
      try {
        await ddb.send(new PutCommand({ TableName: TABLE, Item: item }));
        console.log(`  -> Insertado id=${item.id} title="${item.title}"`);
      } catch (err) {
        // Error por item individual: lo logueamos y seguimos
        console.error(
          `  ! Error insertando id=${item.id}:`,
          err.message || err
        );
      }
    }
    console.log("Seed finalizado.");
    process.exit(0);
  } catch (err) {
    // Ejemplo: ResourceNotFoundException si la tabla no existe
    if (
      err?.name === "ResourceNotFoundException" ||
      err?.code === "ResourceNotFoundException"
    ) {
      console.error(
        `Error: la tabla '${TABLE}' no existe. Crea la tabla primero (scripts/createTable.js).`
      );
      process.exit(2);
    }
    console.error("Error al ejecutar seed:", err);
    process.exit(1);
  }
}

seed();
