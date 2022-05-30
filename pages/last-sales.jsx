import { useState, useEffect } from "react";

export default function LastSalesPage() {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://geomarb-default-rtdb.firebaseio.com/sales.json")
      .then((res) => res.json())
      .then((data) => {
        const sales = [];

        for (const key in data) sales.push({ ...data[key], id: key });

        console.log(sales);

        setSales(sales);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (!sales) return <p>No data yet!</p>;

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
