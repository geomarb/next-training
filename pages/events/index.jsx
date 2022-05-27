import { getAllEvents } from "../../dummy-data";
import { EventList, EventSearch } from "../../components/events";

export default function AllEventsPage() {
  const events = getAllEvents();

  if (!events) return <>No events found!</>;

  return (
    <>
      <EventSearch />
      <EventList items={events} />
    </>
  );
}
