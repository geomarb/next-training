export const url = "https://geomarb-default-rtdb.firebaseio.com/events.json";

export async function getAllEvents() {
  const res = await fetch(url);
  const data = await res.json();
  return getEvents(data);
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export function getEvents(data) {
  let events = [];
  for (const key in data) events.push({ id: key, ...data[key] });
  return events;
}

export async function getFilteredEvents({ year, month }) {
  const allEvents = await getAllEvents();
  const filteredEvents = filterEvents(allEvents, year, month);

  return filteredEvents;
}

export function filterEvents(allEvents, year, month) {
  return allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
}

export function isValidYearAndMonth(year, month) {
  const isValidYear = !isNaN(year) && year <= 2030 && year >= 2021;
  const isValidMonth = !isNaN(month) && month >= 1 && month <= 12;

  return isValidYear && isValidMonth;
}

export function getYearAndMonth(filterData) {
  const [filteredYear, filteredMonth] = filterData;

  return [+filteredYear, +filteredMonth];
}
