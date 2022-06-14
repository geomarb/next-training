import { InvalidEntity } from "../helpers/http.error.helper";

export function validateUser(email, password) {
  const isEmailValid = email && email.includes("@");
  const isPasswordValid = password && password.trim().length >= 7;

  if (!isEmailValid) {
    throw new InvalidEntity("Invalid input - invalid email.");
  }

  if (!isPasswordValid) {
    throw new InvalidEntity(
      "Invalid input - password should also be at least 7 characters long."
    );
  }
}
