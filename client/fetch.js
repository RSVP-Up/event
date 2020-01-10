// TODO automate CircleCI build and deployment to AWS

const eventAPI = 'http://ec2-18-224-109-0.us-east-2.compute.amazonaws.com/event/';
const rsvpAPI = 'http://ec2-13-58-208-149.us-east-2.compute.amazonaws.com/rsvp/';

// Given the address to the api endpoint and '/eventId' fetches data for that specific event
const fetchEventDataFromAPI = (API, eventId, endpoint) => {
  const address = endpoint ? `${API}${endpoint}/${eventId}` : `${API}${eventId}`;
  return fetch(address)
    .then((response) => response.json())
    .then((data) => data);
};

const fetchAllEventData = (eventId) => (
  Promise.all([
    fetchEventDataFromAPI(eventAPI, eventId),
    fetchEventDataFromAPI(rsvpAPI, eventId, 'hosts'),
  ]).then(([event, hosts]) => {
    return { event, hosts };
  }));

export default fetchAllEventData;
