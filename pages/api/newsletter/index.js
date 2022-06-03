import { connectDatabase, inserDocument } from "../../../helpers/db-util";

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
      await inserDocument(client, "newsletter", { email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    res.status(201).json({ message: "Signed up" });
  }
}
