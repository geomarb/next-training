import { EventList } from "../../components";
import { getAllEvents } from "../../dummy-data";

export default function AllEventsPage() {
  const events = getAllEvents();

  if (!events) return <>No events found!</>;

  return (
    <div>
      <EventList items={events} />
    </div>
  );
}
