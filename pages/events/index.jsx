import Head from "next/head";
import { useRouter } from "next/router";

import { EventList, EventSearch } from "../../components/events";
import { getAllEvents } from "../../helpers/api-util";

export default function AllEventsPage({ events }) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <>
      <Head>
        <title>All Events</title>
        <meda
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}

export async function getStaticProps() {
  return { props: { events: await getAllEvents() }, revalidate: 60 };
}
