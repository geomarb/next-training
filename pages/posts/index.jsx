import Head from "next/head";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../helpers/posts";

export default function AllPostsPage(props) {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programing-related tutorials and posts"
        />
      </Head>
      <AllPosts {...props} />
    </>
  );
}

export function getStaticProps() {
  return { props: { posts: getAllPosts() } };
}
