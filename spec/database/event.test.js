const sinon = require('sinon');
require('sinon-mongoose');

const Event = require('../../database/Event.js');

describe('Event', () => {
  let eventData;
  beforeEach(() => {
    eventData = {
      eventId: 103,
      title: 'Testing Mongoose 101',
      local_date_time: new Date(),
      orgId: 'o10',
      series: {
        description: 'Every 2nd Sunday of the month until April 2020',
        frequency: {
          day_of_week: 'Sunday',
          interval: 2,
        },
      },
    };
  });
  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore();
  });
  test('Should save all event properties: eventId, title, local_date_time, orgId, series', () => {
    const eventDoc = new Event(eventData);
    const eventMock = sinon.mock(eventDoc);
    // what we expect from the database
    eventMock.expects('save').exactly(1);
    // Mongoose method
    eventDoc.save();
    eventMock.verify();
  });
  test('Should save events that don\'t repeat', () => {
    // create a new event that doesn't repeat
    eventData.series = null;
    const eventDoc = new Event(eventData);
    const eventMock = sinon.mock(eventDoc);
    // what we expect from the database
    eventMock.expects('save').exactly(1);
    // Mongoose method
    eventDoc.save();
    eventMock.verify();
  });
});
