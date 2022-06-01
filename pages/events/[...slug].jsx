import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
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

  const pageHeadData = (
    <Head>
      <title>Filter Events</title>
      <meda
        name="description"
        content={
          month && year ? `All events for ${month}/${year}` : "A list of events"
        }
      />
    </Head>
  );

  if (!events)
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    );

  if (!isValidYearAndMonth(year, month) || error) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert message="Invalid filter. Please adjust your values" />
      </>
    );
  }
  const filteredEvents = filterEvents(events, year, month);

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert
          link="/events"
          buttonTitle="Show All Events"
          message="No events found for the chosen filter!"
        />
      </>
    );
  }

  return (
    <>
      {pageHeadData}
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
