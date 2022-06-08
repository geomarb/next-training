import { Fragment } from "react";
import Head from "next/head";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../helpers/posts";

export default function PostDetailPage({ post }) {
  if (!post) return null;

  return (
    <Fragment>
      <Head>
        <title>{post?.title}</title>
        <meta name="description" content={post?.excerpt} />
      </Head>
      <PostContent post={post} />
    </Fragment>
  );
}

export function getStaticProps(ctx) {
  const post = getPostData(ctx.params?.slug);
  return { props: { post }, revalidate: 600 };
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map((fileName) => fileName.replace(/.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
