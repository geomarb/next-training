import { InternalError } from "../helpers/http.error.helper";

export async function createUser(email, password) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new InternalError(data.message);
  }

  return data;
}
