import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../helpers/posts";

export default function HomePage(props) {
  return (
    <>
      <Hero />
      <FeaturedPosts {...props} />
    </>
  );
}

export function getStaticProps() {
  return { props: { posts: getFeaturedPosts() }, revalidate: 60 * 60 * 4 };
}
