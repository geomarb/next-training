import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newMessage = { email, name, message };
    const connectString = getConnectString();

    try {
      const client = await MongoClient.connect(connectString);
      const db = client.db();
      const result = await db.collection("messages").insertOne(newMessage);

      newMessage.id = result.insertedId;

      client.close();
      res
        .status(201)
        .json({ message: "Successfully stored message!", newMessage });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong." });
    }
  }
}

function buildConnectString(username, password, clustername, database) {
  return `mongodb+srv://${username}:${password}@${clustername}.sr7nv.mongodb.net/${database}?retryWrites=true&w=majority`;
}

function getConnectString() {
  return buildConnectString(
    process.env.MONGODB_USERNAME,
    process.env.MONGODB_PASSWORD,
    process.env.MONGODB_CLUSTERNAME,
    process.env.MONGODB_DATABASE
  );
}
