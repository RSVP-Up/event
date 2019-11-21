// Organization model in MongoDB
// Org =
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
let organizations = [];

for (let i = 0; i < 30; i++) {
  const orgId = 'o' + i;
  const name = faker.company.companyName();
  const private = faker.random.boolean();
  const members;
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

//
