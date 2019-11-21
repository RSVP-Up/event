// Group model in MongoDB
// Group =
// {
//  orgId: int,
//  name: string,
//  private: boolean,
//  members: {
//    organizers: [ memberId: “m” + int, …],
//    groupMembers: [ memberId: “m” + int , …],
//  },
//  events: [
//    {
//     eventId: int,
//     title: string,
//     local_date_time: ISO 8601,
//     series: {
//       description: string,
//       frequency: {
//         days_of_week: string,
//         interval: int,
//         week_of_month: int
//         },
//         endDate: ISO 8601,
//       },
//     }
//   ],
// }

const faker = require('faker')

// There are usually less organizations than there are events
// Or, in other words, each organization can hold multiple events, of which there are 100
// With 20 events distributed evenly that is an average of 5 events per org
let organizations = [];

for (let i = 0; i < 20; i++) {
  const orgId = 'o' + i;
  const name = faker.company.companyName();
  const private = faker.random.boolean();
  const members = eventMembers();
  const events;

  let newOrg = {
    orgId,
    name,
    private,
    members,
    events
  }

  organizations.push(newOrg);
}

//Each organization has between 1 and 4 organizers and up to 50 members
var eventMembers = () => {
  const organizers = memberIds(4);
  const groupMembers = memberIds(50);

  let members = {
    organizers,
    groupMembers
  };

  return members;
}

// Given a maxiumum quantity max, returns an array of memberIds between 1 and max
var memberIds = (max) => {
  let ids = [];
  const numberOfElements = faker.random.number({min: 1, max: max});
  for (let i = 0; i < numberOfElements; i ++) {
    const newId = 'm' + faker.random.number(499);
    ids.push(newId);
  }
  return ids;
}