import Head from "next/head";

import { getFeaturedEvents } from "../helpers/api-util";
import { EventList } from "../components/events";
import NewsletterRegistration from "../components/input/newsletter-registration";

export default function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Next JS Events</title>
        <meda
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  return { props: { events: await getFeaturedEvents(), revalidate: 60 * 30 } };
}
