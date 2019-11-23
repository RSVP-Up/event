const { expect } = require('chai');
const { organizations } = require('../database/seed');
const { events } = require('../database/seed.js');

describe('Events', () => {
  test('Should account for 100 main records', () => {
    expect(events).to.have.lengthOf(100);
  });

  test('Each event should have an id', () => {
    const eventIdx = Math.floor(Math.random() * 100);
    const event = events[eventIdx];
    expect(event).to.have.property('eventId');
  });
});

describe('Organizations', () => {
  test('Should be less than the total events', () => {
    expect(organizations.length).to.be.below(100);
  });
});
