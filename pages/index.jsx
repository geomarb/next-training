import { useRef } from "react";

export default function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.target.currrent.value;
    const enteredFeedback = feedbackInputRef.target.currrent.value;
  }

  return (
    <div>
      <form action="" onSubmit={submitFormHandler}>
        <h1>The Home Page</h1>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" name="" id="email" ref={emailIputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea
            name="feedback"
            id="feedback"
            rows="5"
            ref={feedbackIputRef}
          ></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
    </div>
  );
}
