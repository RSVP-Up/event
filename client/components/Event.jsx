import React from 'react';
import { Button } from 'semantic-ui-react';

const eventAPI = 'http://localhost:5000/event';
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
    return (
      <div>
        Event component
        <Button>Click Here</Button>
      </div>
    );
  }
}

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
