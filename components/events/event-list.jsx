import EventItem from "./event-item";
export default function EventList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <EventItem key={item.id} {...item} />
      ))}
    </ul>
  );
}
