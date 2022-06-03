import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  console.log("route reached");
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email || !email.includes("@") || !email.includes(".")) {
      return res.status(422).json({ message: "Inavlid email address." });
    }

    const client = await MongoClient.connect(
      `mongodb+srv://root:kXrFk778zMRXyu8w@cluster0.sr7nv.mongodb.net/?retryWrites=true&w=majority`
    );

    const db = client.db("newsletter");
    await db.collection("emails").insertOne({ email });
    client.close();

    res.status(201).json({ message: "Signed up" });
  }
}
