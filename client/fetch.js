const eventAPI = 'http://localhost:5000/event/';
const rsvpAPI = 'http://localhost:3001/rsvp/';

const fetchEvent = (eventId) => (fetch(eventAPI + eventId));

const fetchHosts = (eventId) => (fetch(rsvpAPI + eventId, { mode: 'no-cors' }));

const fetchAllEventData = (eventId) => (
  Promise.all([
    fetchEvent(eventId),
    fetchHosts(eventId),
  ]).then(([event, hosts]) => ({ event, hosts }))
);

export default fetchAllEventData;
