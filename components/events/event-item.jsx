import Link from "next/link";

export default function EventItem({ id, title, location, date, image }) {
  const dtOpt = { day: "numeric", month: "long", year: "numeric" };
  const humanReadableDate = new Date(date).toLocaleDateString("pt-BR", dtOpt);
  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li>
      <img src={`/${image}`} alt={title} />
      <div className="">
        <div className="">
          <h2 className="">{title}</h2>
          <div className="">
            <time>{humanReadableDate}</time>
          </div>
          <div className="">
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className="">
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
}
