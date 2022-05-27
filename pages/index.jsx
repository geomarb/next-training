import { getFeaturedEvents } from "../dummy-data";
import { EventList } from "../components/events";

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <h1>Home Page</h1>
      <EventList items={featuredEvents} />
    </div>
  );
}
