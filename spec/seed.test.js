const _ = require('lodash');
const { expect } = require('chai');
const { organizations } = require('../database/seed');
const { events } = require('../database/seed.js');

describe('Events', () => {
  describe('Range', () => {
    test('Should account for 100 main records', () => {
      expect(events).to.have.lengthOf(100);
    });
    test('Each event should have a unique identifier', () => {
      const identifiers = _.map(events, 'eventId');
      const uniqueIds = _.uniq(identifiers);
      expect(uniqueIds).to.have.lengthOf(events.length);
    });
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
    test('Each event should store title, date, orgId, and series', () => {
      const keys = ['title', 'local_date_time', 'orgId', 'series'];
      expect(event).to.have.all.keys(keys);
    });
    describe('Each property should have the right data type', () => {
      beforeEach(() => {
        const eventIdx = Math.floor(Math.random() * 100);
        event = events[eventIdx];
      });
    });
  });
  describe('Series Properties', () => {
    test('Not all events repeat', () => {
      const oneTimeEvents = _.filter(events, (event) => event.series === null);
      expect(oneTimeEvents).to.have.lengthOf.above(0);
    });
    test('Events that repeat should have a description property', () => {
      const repeatEvents = _.filter(events, (event) => event.series !== null);
      const eventIdx = Math.floor(Math.random() * repeatEvents.length);
      expect(repeatEvents[eventIdx].series).to.have.property('description');
    });
  });
});

describe('Organizations', () => {
  describe('Range', () => {
    test('Should be less than the total events', () => {
      expect(organizations.length).to.be.below(100);
    });
    test('Each org should have a unique identifier', () => {
      const identifiers = _.map(organizations, 'orgId');
      const uniqueIds = _.uniq(identifiers);
      expect(uniqueIds).to.have.lengthOf(organizations.length);
    });
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
    test('Each organization should store org_name, whether it\'s private, and members', () => {
      const keys = ['org_name', 'org_private', 'members'];
      expect(org).to.have.all.keys(keys);
    });
    test('The members should include organizers and group members', () => {
      const memberProperties = ['organizers', 'group_members'];
      expect(org.members).to.have.all.keys(memberProperties);
    });
  });
});
