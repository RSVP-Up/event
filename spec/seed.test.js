const { expect } = require('chai');
const { organizations } = require('../database/seed');
const { events } = require('../database/seed.js');

describe('Events', () => {
  test('Should account for 100 main records', () => {
    expect(events).to.have.lengthOf(100);
  });
  describe('Schema', () => {
    let event;
    beforeEach(() => {
      const eventIdx = Math.floor(Math.random() * 100);
      event = events[eventIdx];
    });
    test('Each event should be an object', () => {
      expect(event).to.be.an('object');
    });
    test('Each event should store eventId, title, date, orgId, and series', () => {
      const keys = ['eventId', 'title', 'local_date_time', 'orgId', 'series'];
      expect(event).to.have.all.keys(keys);
    });
  });
  // test('Not all events repeat', () => {
  // });
});

describe('Organizations', () => {
  test('Should be less than the total events', () => {
    expect(organizations.length).to.be.below(100);
  });
  describe('Schema', () => {
    let org;
    beforeEach(() => {
      const orgIdx = Math.floor(Math.random() * 20);
      org = organizations[orgIdx];
    });
    test('Each organization should be an object', () => {
      expect(org).to.be.an('object');
    });
    test('Each organization should store orgId and org_name, whether it\'s private, and members', () => {
      const keys = ['orgId', 'org_name', 'org_private', 'members'];
      expect(org).to.have.all.keys(keys);
    });
  });
});
