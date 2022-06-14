import { getCollection } from "../helpers/db.helper";
import { validateUser } from "../validators/user.validation";
import { hashPassword } from "../helpers/auth.helper";

export async function getUserCollection() {
  return await getCollection("user");
}

export async function createUser(email, password) {
  validateUser(email, password);

  try {
    const userCollection = await getUserCollection();
    const result = userCollection.insertOne({
      email,
      password: await hashPassword(password),
    });

    return { id: result.insertedId, email, password };
  } catch (error) {
    console.error(error);
  }
}
