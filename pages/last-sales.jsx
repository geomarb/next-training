import { useState, useEffect } from "react";
import useSWR from "swr";

export default function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);

  const { data, error } = useSWR(
    "https://geomarb-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const sales = [];
      for (const key in data) sales.push({ ...data[key], id: key });
      setSales(sales);
    }
  }, [data]);

  if (error) return <p>Failed do load.</p>;

  if (!data && !sales) return <p>Loading...</p>;

  return (
    <ul>
      {sales.map(({ id, username, volume }) => (
        <li key={id}>
          {username} - ${volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://geomarb-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await res.json();

  const sales = [];
  for (const key in data) sales.push({ ...data[key], id: key });

  return { props: { sales } };
}
