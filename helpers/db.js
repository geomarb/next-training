import { MongoClient } from "mongodb";

export async function connectToDatabse() {
  return await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.sr7nv.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
  );
}
