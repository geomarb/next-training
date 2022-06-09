import { hashPassword } from "../../helpers/auth";
import { connectToDatabse } from "../../helpers/db";

const isLoginValid = (email, password) =>
  !email || !email.includes("@") || !password || password.trim().lenght < 7;

export default async function handler(req, res) {
  const { email, password } = req.body;

  if (isLoginValid(email, password)) {
    return res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
  }

  const client = await connectToDatabse();
  const db = client.db();
  const hashedPassword = await hashPassword(password);
  const result = await db
    .collection("users")
    .insertOne({ email, password: hashedPassword });

  res.status(201).json({ message: "Created user!", user: { email } });
}
