import { useRouter } from "next/router";

import { getAllEvents } from "../../dummy-data";
import { EventList, EventSearch } from "../../components/events";

export default function AllEventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  function findEventsHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}
