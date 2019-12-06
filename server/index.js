const express = require('express');
const bodyParser = require('body-parser');

const Orgs = require('../database/Org.js');
const Events = require('../database/Event.js');

const app = express();

const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/event/:eventId', (req, res) => {
  const eventData = {
    title: '',
    local_date_time: '',
    org_name: '',
    private: false,
  };
  return Events.findOne({ eventId: req.params.eventId })
    .then((event) => {
      eventData.title = event.title;
      eventData.local_date_time = event.local_date_time;
      return Orgs.findOne({ orgId: event.orgId }, 'org_name org_private');
    })
    .then((org) => {
      eventData.org_name = org.org_name;
      eventData.private = org.org_private;
      res.json(eventData);
    });
});

app.get('/event/org/members/:eventId', (req, res) => {
  return Events.findOne({ eventId: req.params.eventId })
    .then((event) => Orgs.findOne({ orgId: event.orgId }, 'members'))
    .then((org) => {
      res.json(org.members);
    });
});

app.listen(PORT, () => {
  console.log(`Event module listening on port ${PORT}`);
});
