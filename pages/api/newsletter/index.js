import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  console.log("route reached");
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email || !email.includes("@") || !email.includes(".")) {
      return res.status(422).json({ message: "Inavlid email address." });
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      await inserDocument(client, { email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    res.status(201).json({ message: "Signed up" });
  }
}

async function inserDocument(client, document) {
  const db = client.db("events");
  await db.collection("newsletter").insertOne(document);
}

async function connectDatabase() {
  return await MongoClient.connect(
    `mongodb+srv://root:kXrFk778zMRXyu8w@cluster0.sr7nv.mongodb.net/?retryWrites=true&w=majority`
  );
}
