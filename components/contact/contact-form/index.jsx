import { useState, useEffect } from "react";
import Notification from "../../ui/notification";
import classes from "./styles.module.css";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendMessageHandler(e) {
    e.preventDefault();

    setRequestStatus("pending");

    try {
      await sendContactData({ email, name, message });
      setRequestStatus("success");

      setEmail("");
      setName("");
      setMessage("");
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }

  let notification;

  if (requestStatus === "pending")
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };

  if (requestStatus === "success")
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully!",
    };

  if (requestStatus === "error")
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            type="text"
            id="message"
            rows="5"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && <Notification {...notification} />}
    </section>
  );
}

async function sendContactData(contactDetails) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactDetails),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.messge || "Something went wrong!");
  }
}
