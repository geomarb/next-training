import { MongoClient } from "mongodb";

export async function connectToDatabse() {
  console.log(process.env.MONGODB_USERNAME);
  console.log(process.env.MONGODB_PASSWORD);
  console.log(process.env.MONGODB_CLUSTER);
  console.log(process.env.MONGODB_DATABASE);
  return await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.sr7nv.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
  );
}

export async function getDb() {
  const client = await connectToDatabse();

  const db = client.db();
  return db;
}

export async function getCollection(collection) {
  const db = await getDb();

  return await db.collection(collection);
}
