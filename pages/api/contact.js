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

    try {
      console.log(process.env.REACT_APP_MONGODB);
      const client = await MongoClient.connect(process.env.REACT_APP_MONGODB);
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
