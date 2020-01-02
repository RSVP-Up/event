import data from './sample_data';

// TODO automate CircleCI build and deployment to AWS

const eventAPI = 'http://event-header/event/';
// TODO get publicly available web service address for rsvpAPI
// const rsvpAPI = 'http://localhost:3001/rsvp/hosts/';

const { hosts } = data;

const fetchEvent = (eventId) => {
  return fetch(eventAPI + eventId)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    });
};

// const fetchHosts = (eventId) => {
//   return fetch(rsvpAPI + eventId)
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       return data;
//     });
// };

// const fetchAllEventData = (eventId) => (
//   Promise.all([
//     fetchEvent(eventId),
//     fetchHosts(eventId),
//   ]).then(([event, hosts]) => {
//     return { event, hosts };
//   }));

const fetchAllEventData = (eventId) => {
  return fetchEvent(eventId)
    .then(event => {
      return { event, hosts };
    })
};


export default fetchAllEventData;
