import fs from "fs";
import path, { parse } from "path";
import feedback from "../../data/feedback.json";

export default function handler(req, res) {
  if (req.method === "POST") {
    const newFeedback = { id: new Date().toISOString, ...req.body };

    const filePath = path.join(process.cwd, "data", "feedback.json");

    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    return res.status(201).json({ message: "Success", feedback: newFeedback });
  }

  res.status(200).json({ message: "This works!" });
}
