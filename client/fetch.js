import data from './sample_data';
const eventAPI = 'http://localhost:5000/event/';
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
      console.log(event)
      return { event, hosts };
    })
};


export default fetchAllEventData;
