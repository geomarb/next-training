import path from "path";
import fs from "fs/promises";

export default function ProductDetailPage({ loadedProduct }) {
  if (!loadedProduct) return <p>Loading...</p>;

  const { title, description } = loadedProduct;

  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  console.log("(Re-)Generating-*");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const { products } = JSON.parse(jsonData);

  const product = products.find((prod) => prod.id === productId);

  return { props: { loadedProduct: product } };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { pid: "p1" } }],
    fallback: true,
  };
}
