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

export function getEvents(data) {
  let events = [];
  for (const key in data) events.push({ id: key, ...data[key] });
  return events;
}
