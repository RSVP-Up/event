const _ = require('lodash');
const { expect } = require('chai');
const sinon = require('sinon');
const request = require('request');

const server = 'http://localhost:5000';

describe('Event API', () => {
  const randomEventId = Math.floor(Math.random() * 100);
  describe('GET /event/summary/:eventId', () => {
    const eventDataKeys = ['title', 'org_name', 'org_private'];
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
    const url = `${server}/event/${randomEventId}`;
    test('Should return the date and time as well as the summary of the event', (done) => {
      const eventDataKeys = ['title', 'local_date_time', 'org_name', 'org_private'];
      request.get(url, (err, res, body) => {
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
    test('Values of date and time should be of the right type in the response', (done) => {
      request.get(url, (err, res, body) => {
        const parsedBody = JSON.parse(body);
        expect(typeof parsedBody.local_date_time).to.equal('string');
        done();
      });
    });
  });
  describe('GET /event/org/members/:eventId', () => {
    const url = `${server}/event/org/members/${randomEventId}`;
    test('Should return the organization members and founders', (done) => {
      const memberDataKeys = ['founders', 'group_members'];
      request.get(url, (err, res, body) => {
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
    test('Values of founders and members should be of the right type in the response', (done) => {
      request.get(url, (err, res, body) => {
        const parsedBody = JSON.parse(body);
        expect(Array.isArray(parsedBody.founders)).to.equal(true);
        expect(Array.isArray(parsedBody.group_members)).to.equal(true);
        done();
      });
    });
  });
  describe('Should throw an error', () => {
    const badEventId = 999;
    const endPoints = [`${server}/event/summary/${badEventId}`, `${server}/event/timedate/${badEventId}`, `${server}/event/org/members/${badEventId}`];
    describe('if the event doesn\'t exist', () => {
      test('on the Summary or Event endpoint', (done) => {
        request.get(endPoints[0], (err, res, body) => {
          expect(res.statusCode).to.equal(404);
          expect(res.headers['content-type']).to.contain('application/json');
          const parsedBody = JSON.parse(body);
          expect(parsedBody.status).to.equal('error');
          expect(parsedBody.message).to.equal('That event does not exist');
          done();
        });
      });
      test('on the timedate endpoint', (done) => {
        request.get(endPoints[1], (err, res, body) => {
          expect(res.statusCode).to.equal(404);
          expect(res.headers['content-type']).to.contain('application/json');
          const parsedBody = JSON.parse(body);
          expect(parsedBody.status).to.equal('error');
          expect(parsedBody.message).to.equal('That event does not exist');
          done();
        });
      });
      test('on the organization members endpoint', (done) => {
        request.get(endPoints[2], (err, res, body) => {
          expect(res.statusCode).to.equal(404);
          expect(res.headers['content-type']).to.contain('application/json');
          const parsedBody = JSON.parse(body);
          expect(parsedBody.status).to.equal('error');
          expect(parsedBody.message).to.equal('That event does not exist');
          done();
        });
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
