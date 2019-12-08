const _ = require('lodash');
const { expect } = require('chai');
const sinon = require('sinon');
const request = require('request');

const server = 'http://localhost:5000';

describe('Event API', () => {
  describe('GET /event/summary/:eventId', () => {
    const eventDataKeys = ['title', 'org_name', 'org_private'];
    const randomEventId = Math.floor(Math.random() * 100);
    const url = `${server}/event/summary/${randomEventId}`;
    test('Should return event data necessary to render the Event module: event title, name of the organization hosting it, and whether that organization is public or private', (done) => {
      request.get(url, (err, res, body) => {
        // make sure the resonse contains a status code and that it's 200 since it's successful
        expect(res.statusCode).to.equal(200);
        // the response should be JSON
        expect(res.headers['content-type']).to.contain('application/json');
        // convert the JSON response
        const parsedBody = JSON.parse(body);
        // should have the right key value pairs
        expect(parsedBody).to.include.all.keys(eventDataKeys);
        done();
      });
    });
    test('Values should be of the right type', (done) => {
      request.get(url, (err, res, body) => {
        const parsedBody = JSON.parse(body);
        const rightTypes = _.reduce(parsedBody, (acc, value, key) => {
          let rightType;
          if (key === 'org_private') {
            rightType = (typeof value === 'boolean');
          } else {
            rightType = (typeof value === 'string');
          }
          return acc && rightType;
        }, true);
        expect(rightTypes).to.equal(true);
        done();
      });
    });
  });
  describe('GET /event/:eventId', () => {
    test('Should return the date and time as well as the summary of the event', (done) => {
      const eventDataKeys = ['title', 'local_date_time', 'org_name', 'org_private'];
      const randomEventId = Math.floor(Math.random() * 100);
      request.get(`${server}/event/${randomEventId}`, (err, res, body) => {
        // make sure the resonse contains a status code and that it's 200 since it's successful
        expect(res.statusCode).to.equal(200);
        // the response should be JSON
        expect(res.headers['content-type']).to.contain('application/json');
        // convert the JSON response
        const parsedBody = JSON.parse(body);
        expect(parsedBody).to.include.all.keys(eventDataKeys);
        done();
      });
    });
  });
  describe('GET /event/org/members/:eventId', () => {
    test('Should return the organization members and founders', (done) => {
      const memberDataKeys = ['founders', 'group_members'];
      const randomEventId = Math.floor(Math.random() * 100);
      request.get(`${server}/event/org/members/${randomEventId}`, (err, res, body) => {
        // make sure the resonse contains a status code and that it's 200 since it's successful
        expect(res.statusCode).to.equal(200);
        // the response should be JSON
        expect(res.headers['content-type']).to.contain('application/json');
        // convert the JSON response
        const parsedBody = JSON.parse(body);
        expect(parsedBody).to.include.all.keys(memberDataKeys);
        done();
      });
    });
  });
  describe('GET /event/timedate/:eventId', () => {
    test('Should return the time and date of the event and its frequency', (done) => {
      const timeDateDataKeys = ['local_date_time', 'description'];
      const randomEventId = Math.floor(Math.random() * 100);
      request.get(`${server}/event/timedate/${randomEventId}`, (err, res, body) => {
        // make sure the resonse contains a status code and that it's 200 since it's successful
        expect(res.statusCode).to.equal(200);
        // the response should be JSON
        expect(res.headers['content-type']).to.contain('application/json');
        // convert the JSON response
        const parsedBody = JSON.parse(body);
        expect(parsedBody).to.include.all.keys(timeDateDataKeys);
        done();
      });
    });
  });

  describe('when stubbed', () => {
    beforeEach(() => {
      this.get = sinon.stub(request, 'get');
    });
    afterEach(() => {
      request.restore();
    });
    // test cases
  });
});
