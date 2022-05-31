import { getFeaturedEvents } from "../helpers/api-util";
import { EventList } from "../components/events";

export default function HomePage(props) {
  return (
    <div>
      <h1>Home Page</h1>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  return { props: { events: await getFeaturedEvents(), revalidate: 60 * 30 } };
}
