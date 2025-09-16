import ddb from "../config/dbClient.js";
import { ScanCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const TABLE = process.env.TABLE_NAME || "tb_books";

export const getBooks = async (req, res) => {
  try {
    // Opcional: ?limit=10&lastKey=<encodedJSON>
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : undefined;
    const lastKey = req.query.lastKey
      ? JSON.parse(decodeURIComponent(req.query.lastKey))
      : undefined;

    const params = { TableName: TABLE };
    if (limit) params.Limit = limit;
    if (lastKey) params.ExclusiveStartKey = lastKey;

    const command = new ScanCommand(params);
    const data = await ddb.send(command);

    // Devolver items y la posible lastEvaluatedKey para paginación
    return res.json({
      items: data.Items || [],
      lastKey: data.LastEvaluatedKey
        ? encodeURIComponent(JSON.stringify(data.LastEvaluatedKey))
        : null,
    });
  } catch (err) {
    console.error("getBooks error:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal server error" });
  }
};

export const getBooksById = async (req, res) => {
  try {
    const { id } = req.params;
    const command = new GetCommand({ TableName: TABLE, Key: { id } });
    const data = await ddb.send(command);
    if (!data.Item) return res.status(404).json({ error: "Not found" });
    return res.json(data.Item);
  } catch (err) {
    console.error("getBooksById error:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal server error" });
  }
};
