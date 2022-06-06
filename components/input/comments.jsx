import { useEffect, useState, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment ";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;

  const { showNotification } = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFecthingComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsFecthingComments(true);
      showNotification({
        title: "Loading comments...",
        message: "The comments are currently being loaded from database.",
        status: "pending",
      });
      fetch(`/api/comments/${eventId}`)
        .then((res) => {
          if (res.ok) return res.json();

          return res.then((data) => {
            throw new Error(data.message || "Something went wrong.");
          });
        })
        .then((data) => {
          showNotification({
            title: "Success!",
            message: `Your comments were loaded!`,
            status: "success",
          });

          setComments(data.comments);
          setIsFecthingComments(false);
        })
        .catch((err) => {
          showNotification({
            title: "Error!",
            message: err.message || `Somthing went wrong!`,
            status: "error",
          });
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being stored into a database.",
      status: "pending",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) return res.json();

        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        showNotification({
          title: "Success!",
          message: `Your comment was saved!`,
          status: "success",
        });
      })
      .catch((err) => {
        showNotification({
          title: "Error!",
          message: err.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
