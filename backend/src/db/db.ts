import { Db, MongoClient } from "mongodb";

let dbConnection: Db | null = null;
const connectionString = process.env.MONGODB_URI;

if (!connectionString) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

export const connectToDatabase = async (): Promise<Db> => {
  if (dbConnection) {
    return dbConnection;
  }

  console.log(`Connecting to MongoDB at ${connectionString}...`);

  const client = await MongoClient.connect(connectionString);
  dbConnection = client.db();

  return dbConnection;
};

export const getDatabase = (): Db => {
  if (!dbConnection) {
    throw new Error("Database not initialized. Call connectToDatabase first.");
  }
  return dbConnection;
};
