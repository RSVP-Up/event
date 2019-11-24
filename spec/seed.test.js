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
    test('Each event should store id, title, date, orgId, and series', () => {
      const keys = ['eventId', 'title', 'local_date_time', 'orgId', 'series'];
      expect(event).to.have.all.keys(keys);
    });
    test('Each property should have the right data type', () => {
      const rightTypes = _.reduce(event, (acc, value, key) => {
        let rightType;
        if (key === 'eventId') {
          rightType = (typeof value === 'number');
        } else if (key === 'local_date_time') {
          rightType = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(value.toISOString());
        } else if (key === 'series') {
          rightType = (typeof value === 'object');
        } else {
          rightType = (typeof value === 'string');
        }
        return acc && rightType;
      }, true);
      expect(rightTypes).to.equal(true);
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
      expect(repeatEvents[eventIdx].series.description).to.be.a('string');
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
    test('Each organization should store orgId, org_name, whether it\'s private, and members', () => {
      const keys = ['orgId', 'org_name', 'org_private', 'members'];
      expect(org).to.have.all.keys(keys);
    });
    test('Each property should have the right data type', () => {
      const rightTypes = _.reduce(org, (acc, value, key) => {
        let rightType;
        if (key === 'orgId') {
          rightType = /o\d/.test(value);
        } else if (key === 'members') {
          rightType = (typeof value === 'object');
        } else if (key === 'org_private') {
          rightType = (typeof value === 'boolean');
        } else {
          rightType = (typeof value === 'string');
        }
        return acc && rightType;
      }, true);
      expect(rightTypes).to.equal(true);
    });
    describe('Members', () => {
      const orgMembers = _.map(organizations, 'members');
      test('The members should include organizers and group members', () => {
        const memberProperties = ['organizers', 'group_members'];
        const member = Math.floor(Math.random() * 20);
        expect(orgMembers[member]).to.have.all.keys(memberProperties);
      });
      test('Organizers and group members should be arrays', () => {
        const member = Math.floor(Math.random() * 20);
        expect(Array.isArray(orgMembers[member].organizers)).to.equal(true);
        expect(Array.isArray(orgMembers[member].group_members)).to.equal(true);
      });
      test('Organizers and group members should be memberIds between 0 and 499', () => {
        const members = _.flatMap(orgMembers, 'group_members');
        const organizers = _.flatMap(orgMembers, 'organizers');
        const totalMembers = _.uniq(_.concat(members, organizers));
        const rightFormat = _.reduce(totalMembers, (acc, value) => {
          return acc && /m([0-9]|[1-8][0-9]|9[0-9]|[1-3][0-9]{2}|4[0-8][0-9]|49[0-9])/.test(value);
        }, true);
        expect(rightFormat).to.equal(true);
      });
    });
  });
});
