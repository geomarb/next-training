import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    `mongodb+srv://root:kXrFk778zMRXyu8w@cluster0.sr7nv.mongodb.net/?retryWrites=true&w=majority`
  );

  const { email, name, text } = req.body;

  if (req.method === "POST") {
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid input" });
    }
    const comment = { email, name, text, eventId };

    const db = client.db("events");
    const result = await db.collection("comments").insertOne(comment);

    res.status(201).json({ message: "Added Comment", comment, result });
    return;
  }

  if (req.method === "GET") {
    const db = client.db("events");
    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }
  client.close();
}
