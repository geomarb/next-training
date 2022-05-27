import { useRouter } from "next/router";
import { Fragment } from "react";

import { EventSummary, EventLogistics, EventContent } from "../../components";
import { getEventById } from "../../dummy-data";

export default function EventDetailPage() {
  const router = useRouter();
  const { eventId } = router.query;

  const event = getEventById(eventId);

  if (!event) return <p>No event found!</p>;

  const { title, description, date, location, image } = event;

  return (
    <Fragment>
      <EventSummary title={title} />
      <EventLogistics
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
    </Fragment>
  );
}
