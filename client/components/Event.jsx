import React from 'react';

const API = 'http://localhost:5000/event';
// const eventId = randomeventId

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // fetchEventData() {
  //   const options = {
  //     method: 'GET',
  //   }
  // }

  render() {
    return <div>Event component</div>;
  }
};

export default Event;

// for fetching in parallel
// function fetchEventData() {
//   return Promise.all([
//     fetchEvent(),
//     fetchHosts()
//   ]).then(([event, hosts]) => {
//     return {event, hosts};
//   })
// }