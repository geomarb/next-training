import classes from "./styles.modules.css";
import PostHeader from "../../post-header";
import { DUMMY_POSTS } from "../../../../pages";

export default function PostContent(props) {
  DUMMY_POSTS[0].content = `# This is a first post`;
  const { slug, title, image, content } = DUMMY_POSTS[0];
  const imagePath = `/images/posts/${slug}/${image}`;
  return (
    <article>
      <PostHeader title={title} image={imagePath} />
      {content}
    </article>
  );
}
