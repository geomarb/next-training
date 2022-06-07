import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../helpers/posts";
import Head from "next/head";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Geo Blog</title>
        <meta
          name="description"
          content="I post about programing and web development."
        />
      </Head>
      <Hero />
      <FeaturedPosts {...props} />
    </>
  );
}

export function getStaticProps() {
  return { props: { posts: getFeaturedPosts() }, revalidate: 60 * 60 * 4 };
}
