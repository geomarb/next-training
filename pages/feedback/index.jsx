export default function FeedbackPage(props) {
  return (
    <div>
      <h1>Feedbaks</h1>
      <p>List of feebacks</p>
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps(params) {
  return;
}
