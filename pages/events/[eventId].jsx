import { Fragment } from "react";

import {
  EventSummary,
  EventLogistics,
  EventContent,
} from "../../components/events";
import { getAllEvents, getEventById } from "../../helpers/api-util";

export default function EventDetailPage({ event }) {
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

export async function getStaticProps(ctx) {
  console.log(ctx.params);
  return { props: { event: await getEventById(ctx.params.eventId) } };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return { paths, fallback: false };
}
