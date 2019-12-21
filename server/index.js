const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const Orgs = require('../database/Org.js');
const Events = require('../database/Event.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

const errorBody = {
  status: 'error',
  message: 'That event does not exist',
};

app.get('/event(/summary)?/:eventId', cors(corsOptions), (req, res) => {
  const eventData = {
    title: '',
    org_name: '',
    org_private: false,
  };
  return Events.findOne({ eventId: req.params.eventId })
    .then((event) => {
      if (event === null) {
        res.status(404).json(errorBody);
      } else {
        eventData.title = event.title;
        // if the request is not for summary add date and time
        if (!/summary/.test(req.url)) {
          eventData.local_date_time = event.local_date_time;
        }
        return Orgs.findOne({ orgId: event.orgId }, 'org_name org_private')
          .then((org) => {
            eventData.org_name = org.org_name;
            eventData.org_private = org.org_private;
            res.status(200).json(eventData);
          });
      }
    });
});

app.get('/event/org/members/:eventId', cors(corsOptions), (req, res) => Events.findOne({ eventId: req.params.eventId })
  .then((event) => {
    if (event === null) {
      res.status(404).json(errorBody);
    } else {
      return Orgs.findOne({ orgId: event.orgId }, 'members')
        .then((org) => {
          res.status(200).json(org.members);
        });
    }
  }));

app.get('/event/timedate/:eventId', cors(corsOptions), (req, res) => Events.findOne({ eventId: req.params.eventId })
  .then((event) => {
    if (event !== null) {
      const timedate = {
        local_date_time: event.local_date_time,
        description: event.series.description ? event.series.description : '',
      };
      res.status(200).json(timedate);
    } else {
      res.status(404).json(errorBody);
    }
  }));

app.listen(PORT, () => {
  console.log(`Event module listening on port ${PORT}`);
});
