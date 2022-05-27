import { useRouter } from "next/router";
import { EventList, ResultsTitle } from "../../components/events";
import { ErrorAlert } from "../../components/ui";
import { getFilteredEvents } from "../../dummy-data";

export default function FilteredEventsPage() {
  const router = useRouter();

  function buildErrorAlert(message) {
    return (
      <ErrorAlert
        link="/events"
        buttonTitle="Show All Events"
        message={message}
      />
    );
  }

  const filterData = router.query.slug;

  if (!filterData) return <p className="center">Loading...</p>;

  const [filteredYear, filteredMonth] = filterData;
  const [year, month] = [+filteredYear, +filteredMonth];
  const isYearOrMonthNaN = isNaN(year) || isNaN(month);
  const isInvalidYear = year > 2030 || year < 2021;
  const isInvalidMonth = month < 1 || month > 12;

  if (isYearOrMonthNaN || isInvalidYear || isInvalidMonth) {
    return <ErrorAlert message="Invalid filter. Please adjust your values" />;
  }

  const filteredEvents = getFilteredEvents({ year, month });

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
