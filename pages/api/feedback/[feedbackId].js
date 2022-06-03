import { getFeedbackData } from ".";

export default function handler(req, res) {
  const { feedbackId } = req.query;
  const feedbackData = getFeedbackData();
  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackId
  );

  res.status(200).json({ feedback: selectedFeedback });
}
