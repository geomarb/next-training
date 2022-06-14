import HttpError, { InternalError } from "../../../helpers/http.error.helper";
import { createUser } from "../../../models/user.model";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  const { email, password } = req.body;

  try {
    console.log("email", email, "password", password);
    const result = await createUser(email, password);

    res.status(201).json({ message: "Created user!", user: { email } });
  } catch (error) {
    if (!(error instanceof HttpError)) error = new InternalError();
    res.status(error.status).json({ message: error.message });
  }
}
