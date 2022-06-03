export default function handler(req, res) {
  console.log("route reached");
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email || !email.includes("@") || !email.includes(".")) {
      return res.status(422).json({ message: "Inavlid email address." });
    }
    console.log(email);

    res.status(201).json({ message: "Signed up" });
  }
}
