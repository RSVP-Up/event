const organizations = require('../database/seed').organizations;
const events = require('../database/seed.js').events;
const expect = require('chai').expect;

describe('Events', () => {
  test('to account for 100 main records', () => {
    expect(events).to.have.lengthOf(100);
  });
});

describe('Organizations', () => {
  test('to be less than the total events', () => {
    expect(organizations.length).to.be.below(100);
  });
});
