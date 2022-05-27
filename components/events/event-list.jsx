import EventItem from "./event-item";
import classes from "./event-list.module.css";

export default function EventList({ items }) {
  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <EventItem key={item.id} {...item} />
      ))}
    </ul>
  );
}
