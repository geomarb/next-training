import { hash } from "bcryptjs";

export async function hashPassword(password) {
  return await hash(password, 12);
}
