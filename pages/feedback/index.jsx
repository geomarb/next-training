import { useState } from "react";
import { getFeedbackData } from "../api/feedback";

export default function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedbackHandler(id) {
    fetch(`/api/feedback/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }
  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <div>
        <h1>Feedbaks</h1>
        <p>List of feebacks</p>
        <ul>
          {props.feedbackItems.map((item) => (
            <li key={item.id}>
              {item.text}
              <button onClick={loadFeedbackHandler.bind(null, item.id)}>
                Show details
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const data = getFeedbackData();
  return { props: { feedbackItems: data } };
}
