import React from 'react';

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
    const { data: { event, hosts } } = this.props;
    const dateTime = event.local_date_time;
    // const dayOfWeek =
    console.log(event, hosts);
    return (
      <div className="eventPageHead stripe">
        <div className="bounds bounds--wide">
          <div className="eventHead--wrapper">
            <div className="eventHead">
              <div className="atMedium_flex-row flex--alignBottom">
                <div className="flex-item flex-item--2">
                  <p className="text--secondary">
                    {event.local_date_time}
                  </p>
                  <h2>
                    {event.title}
                  </h2>
                  <p>
                    Hosted by
                  </p>
                  <p>
                    {hosts.map((host, index, array) => {
                      let hostName = host.name;
                      if (array.length > 1 && index === 0) {
                        hostName += ' and ';
                      }
                      return <span key={hostName}>{hostName}</span>;
                    })}
                  </p>
                </div>
                <div className="flex-item flex-item--shrink pageHead-pageActions">
                  <button type="button">
                    <svg className="swarmIcon" height="18" width="18" viewBox="0 0 18 18">
                      <path d="M8 3.415L6.707 4.707a1 1 0 01-1.414-1.414l3.003-3a1 1 0 011.414 0l2.997 3a1 1 0 11-1.414 1.414L10 3.413V9a1 1 0 11-2 0V3.415zM13.5 9a1 1 0 010-2H15a1 1 0 011 1v7.5a1 1 0 01-1 1H3a1 1 0 01-1-.989l-.085-7.5a1 1 0 011-1.011H4.55a1 1 0 110 2h-.624l.063 5.5H14V9h-.5z" />
                    </svg>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
