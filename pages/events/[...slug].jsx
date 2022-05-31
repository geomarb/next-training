import { useRouter } from "next/router";
import { EventList, ResultsTitle } from "../../components/events";
import { ErrorAlert } from "../../components/ui";
import { getFilteredEvents } from "../../helpers/api-util";

export default function FilteredEventsPage({ hasError, events, year, month }) {
  const router = useRouter();
  const { slug: filterData } = router.query;

  if (!filterData) return <p className="center">Loading...</p>;

  if (hasError) {
    return <ErrorAlert message="Invalid filter. Please adjust your values" />;
  }

  if (!events || events.length === 0) {
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
      <EventList items={events} />
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

function isValidYearAndMonth(year, month) {
  const isValidYear = !isNaN(year) && year <= 2030 && year >= 2021;
  const isValidMonth = !isNaN(month) && month >= 1 && month <= 12;

  return isValidYear && isValidMonth;
}

function getYearAndMonth(filterData) {
  const [filteredYear, filteredMonth] = filterData;

  return [+filteredYear, +filteredMonth];
}
