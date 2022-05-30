import path from "path";
import fs from "fs/promises";
import Link from "next/link";

export default function HomePage({ products }) {
  return (
    <ul>
      {products.map(({ id, title }) => (
        <li key={id}>
          <Link href={`/${id}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  const { products } = data;

  if (!data) return { redirect: { destination: "/no-data" } };

  if (products.lenght === 0) return { notFound: true };

  return { props: { products }, revalidate: 10 };
}
