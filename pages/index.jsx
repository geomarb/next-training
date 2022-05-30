import path from "path";
import fs from "fs/promises";

export default function HomePage({ products }) {
  return (
    <ul>
      {products.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  console.log("(Re-)Generating-*");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const { products } = JSON.parse(jsonData);

  if (!data) return { redirect: { destination: "/no-data" } };

  if (products.lenght === 0) return { notFound: true };

  return { props: { products }, revalidate: 10 };
}
