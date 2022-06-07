import PostsGrid from "../posts-grid";

import classes from "./styles.module.css";

export default function AllPosts(props) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid {...props} />
    </section>
  );
}
