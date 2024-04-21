import { MongoClient } from "mongodb";

let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(process.env.MONGO_URI);

  const db = client.db();
  cachedClient = { client, db };

  return cachedClient;
}

export async function closeConnection() {
  if (cachedClient) {
    await cachedClient.client.close();
    cachedClient = null;
  }
}
