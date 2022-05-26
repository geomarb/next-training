import Link from "next/link";

export default function ClientsPage() {
  const clients = [
    { id: "geo", name: "Geomar Bastiani" },
    { id: "max", name: "Maximilian" },
  ];
  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link href={`/clients/${client.id}`}>{client.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
