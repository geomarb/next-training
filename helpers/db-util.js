import { MongoClient } from "mongodb";

export async function connectDatabase() {
  return await MongoClient.connect(
    `mongodb+srv://root:kXrFk778zMRXyu8w@cluster0.sr7nv.mongodb.net/events?retryWrites=true&w=majority`
  );
}

export async function inserDocument(client, collection, document) {
  const db = client.db();

  return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();
  return await db.collection(collection).find().sort(sort).toArray();
}
