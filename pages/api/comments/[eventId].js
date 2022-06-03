export default function handler(req, res) {
  const eventId = req.query.eventId;

  const { email, name, text } = req.body;

  if (req.method === "POST") {
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid input" });
    }
    const newComment = { id: new Date().toISOString(), email, name, text };
    console.log(newComment);
    res.status(201).json({ message: "Added Comment", comment: newComment });
    return;
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Geo", text: "A first comment" },
      { id: "c2", name: "Max", text: "A secondcomment" },
    ];

    res.status(200).json({ comments: dummyList });
  }
}
