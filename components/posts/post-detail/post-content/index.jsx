import ReactMarkdown from "react-markdown";

import PostHeader from "../post-header";
import classes from "./styles.module.css";

export default function PostContent({ post }) {
  const { slug, title, image, content } = post;
  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
