import ReactMarkdown from "react-markdown";

import PostHeader from "../post-header";
import classes from "./styles.module.css";
import { DUMMY_POSTS } from "../../../../pages";

export default function PostContent(props) {
  DUMMY_POSTS[0].content = `# This is a first post`;
  const { slug, title, image, content } = DUMMY_POSTS[0];
  const imagePath = `/images/posts/${slug}/${image}`;
  return (
    <article className={classes.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
