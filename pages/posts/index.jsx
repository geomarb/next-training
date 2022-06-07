import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../helpers/posts";

export default function AllPostsPage(props) {
  return <AllPosts {...props} />;
}

export function getStaticProps() {
  return { props: { posts: getAllPosts() } };
}
