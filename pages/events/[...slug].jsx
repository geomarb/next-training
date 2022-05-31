import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { EventList, ResultsTitle } from "../../components/events";
import { ErrorAlert } from "../../components/ui";
import {
  getFilteredEvents,
  url,
  getEvents,
  filterEvents,
  isValidYearAndMonth,
  getYearAndMonth,
} from "../../helpers/api-util";
import useSWR from "swr";

export default function FilteredEventsPage(props) {
  const [events, setEvents] = useState(props.event);
  const router = useRouter();
  const { slug: filterData } = router.query;
  const [year, month] = getYearAndMonth(filterData);

  const { data, error } = useSWR(url, (url) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) return setEvents(getEvents(data));
  }, [data]);

  if (!events) return <p className="center">Loading...</p>;

  if (!isValidYearAndMonth(year, month) || error) {
    return <ErrorAlert message="Invalid filter. Please adjust your values" />;
  }
  const filteredEvents = filterEvents(events, year, month);

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <ErrorAlert
        link="/events"
        buttonTitle="Show All Events"
        message="No events found for the chosen filter!"
      />
    );
  }

  return (
    <>
      <ResultsTitle date={new Date(year, month - 1)} />
      <EventList items={filteredEvents} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug: filterData } = context.params;
  const [year, month] = getYearAndMonth(filterData);

  if (!isValidYearAndMonth(year, month)) return { props: { hasError: true } };

  const events = await getFilteredEvents({ year, month });

  return { props: { events, year, month } };
}
