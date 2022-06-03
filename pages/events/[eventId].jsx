import Head from "next/head";

import {
  EventSummary,
  EventLogistics,
  EventContent,
} from "../../components/events";
import { getFeaturedEvents, getEventById } from "../../helpers/api-util";
import Comments from "../../components/input/comments";

export default function EventDetailPage({ event }) {
  if (!event) return <div className="center">Loading....</div>;

  const { title, description, date, location, image } = event;

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meda name="description" content={description} />
      </Head>
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
      <Comments eventId={event.id} />
    </>
  );
}

export async function getStaticProps(ctx) {
  const event = await getEventById(ctx.params.eventId);

  return { props: { event }, revalidate: 30 };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return { paths, fallback: "blocking" };
}
