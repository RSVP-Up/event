const _ = require('lodash');
const { expect }= require('chai');
const server = 'http://localhost:5000';
const sinon = require('sinon');
const request = require('request');

describe('Event module', () => {
  describe('GET /event/:eventId', () => {
    test('Should return event data necessary to render the Event module: event title, date and time, name of the organization hosting it, and whether that organization is public or private', (done) => {
      const eventDataKeys = ['title', 'local_date_time', 'org_name', 'org_private'];
      const randomEventId = Math.floor(Math.random() * 100);
      request.get(`${server}/event/${randomEventId}`, (err, res, body) => {
        // make sure the resonse contains a status code and that it's 200 since it's successful
        expect(res.statusCode).to.equal(200);
        // the response should be JSON
        expect(res.headers['content-type']).to.contain('application/json');
        // convert the JSON response
        let parsedBody = JSON.parse(body);
        expect(parsedBody).to.include.all.keys(eventDataKeys);
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
