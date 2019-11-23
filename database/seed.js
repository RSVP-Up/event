/* eslint-disable camelcase */
/* eslint-disable prefer-const */
// Org model in MongoDB
// Org =
// {
//  orgId: int,
//  org_name: string,
//  org_private: boolean,
//  members: {
//    organizers: [ memberId: “m” + int, …],
//    group_members: [ memberId: “m” + int , …],
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
//        },
//      },
//   }...],
// }

const faker = require('faker');

// There are usually less organizations than there are events
// Or, in other words, each organization can hold multiple events, of which there are 100
// With 20 events distributed evenly that is an average of 5 events per org

const memberIds = (max) => {
  const ids = [];
  const numberOfElements = faker.random.number({ min: 1, max });
  for (let i = 0; i < numberOfElements; i += 1) {
    const newId = `m${faker.random.number(499)}`;
    ids.push(newId);
  }
  return ids;
};
// Each organization has between 1 and 4 organizers and up to 50 members
let eventMembers = () => {
  const organizers = memberIds(4);
  const group_members = memberIds(50);
  const members = {
    organizers,
    group_members,
  };
  return members;
};
// some, but not all events might repeat
let eventSeries = () => {
  const repeat = faker.random.boolean();
  const ordinals = ['1st', '2nd', '3rd'];
  const frequency = {
    day_of_week: faker.date.weekday(),
    interval: faker.random.number(2),
  };
  const description = `Every ${ordinals[frequency.interval]} ${frequency.day_of_week} of the month until May 2020`;
  const newSeries = {
    description,
    frequency,
  };
  return repeat ? newSeries : null;
};

// Given a maximum quantity max, returns an array of memberIds between 1 and max
const events = [];

let generateEvents = () => {
  for (let i = 0; i < 100; i += 1) {
    const eventId = i;
    const title = faker.company.catchPhrase();
    const local_date_time = faker.date.between('2019-10-01', '2020-4-30');
    const orgId = `0 ${faker.random.number(19)}`;
    const series = eventSeries();
    const newEvent = {
      eventId,
      title,
      local_date_time,
      orgId,
      series,
    };
    events.push(newEvent);
  }
  return events;
};

const organizations = [];

let generateOrgs = () => {
  for (let i = 0; i < 20; i += 1) {
    const orgId = `o${i}`;
    const org_name = faker.company.companyName();
    const org_private = faker.random.boolean();
    const members = eventMembers();
    const newOrg = {
      orgId,
      org_name,
      org_private,
      members,
    };
    organizations.push(newOrg);
  }
};

generateOrgs();
generateEvents();

module.exports.organizations = organizations;
module.exports.events = events;
