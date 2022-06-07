import Image from "next/image";
import ReactMarkdown from "react-markdown";

import PostHeader from "../post-header";

import classes from "./styles.module.css";

export default function PostContent({ post }) {
  const { slug, title, image, content } = post;
  const imagePath = `/images/posts/${slug}/${image}`;

  const customRenderers = {
    p(paragraph) {
      const { node } = paragraph;
      const image = node.children[0];
      if (image.type === "element" && image.tagName === "img") {
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
    </article>
  );
}
