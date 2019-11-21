// Org model in MongoDB
// Org =
// {
//  orgId: int,
//  name: string,
//  private: boolean,
//  members: {
//    organizers: [ memberId: “m” + int, …],
//    groupMembers: [ memberId: “m” + int , …],
//  },
//  events: [{
//     eventId: int,
//     title: string,
//     local_date_time: ISO 8601,
//     series: {
//       description: string,
//       frequency: {
//         day_of_week: string,
//         interval: int,
//         week_of_month: int
//         endDate: ISO 8601,
//        },
//      },
//   }...],
// }

const faker = require('faker');

// There are usually less organizations than there are events
// Or, in other words, each organization can hold multiple events, of which there are 100
// With 20 events distributed evenly that is an average of 5 events per org
let organizations = [];

for (let i = 0; i < 20; i++) {
  const orgId = 'o' + i;
  const name = faker.company.companyName();
  const private = faker.random.boolean();
  const members = eventMembers();
  const events = orgEvents(i);

  let newOrg = {
    orgId,
    name,
    private,
    members,
    events,
  }

  organizations.push(newOrg);
}

//Each organization has between 1 and 4 organizers and up to 50 members
var eventMembers = () => {
  const organizers = memberIds(4);
  const groupMembers = memberIds(50);

  let members = {
    organizers,
    groupMembers,
  };

  return members;
}

// Given a maximum quantity max, returns an array of memberIds between 1 and max
var memberIds = (max) => {
  let ids = [];
  const numberOfElements = faker.random.number({min: 1, max: max});
  for (let i = 0; i < numberOfElements; i ++) {
    const newId = 'm' + faker.random.number(499);
    ids.push(newId);
  }
  return ids;
}

var orgEvents = (range) => {
  let events = [];
  for (let i = 0; i < 5; i++) {
  const eventId = range * 5 + i;
  const title = faker.random.catchPhrase();
  const local_date_time = faker.date.between('2019-10-01', '2020-9-30');
  const series = eventSeries();

  let newEvent = {
    eventId,
    title,
    local_date_time,
    series
  }

  events.push(newEvent);

  }

  return events;
}

// some, but not all events might repeat
var eventSeries = () => {
  const repeat = faker.random.boolean();
  const ordinals = ['1st', '2nd', '3rd'];
  const frequency = {
    day_of_week: faker.date.weekday(),
    interval: faker.random.arrayElement(ordinals);
    endDate: faker.date.future(1),
  }
  const description = 'Every ' + frequency.interval + ' ' + frequency.day_of_week + ' of the month until May 2020';

  let newSeries = {
    description,
    frequency,
  };
  return repeat ? newSeries : null;
}