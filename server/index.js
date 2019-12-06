const express = require('express');
const bodyParser = require('body-parser');

const Orgs = require('../database/Org.js');
const Events = require('../database/Event.js');

const app = express();

const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// {title: ‘Algorithms @ Betterment’,
//   local_date_time: "2015-04-03T20:10:12.819Z",
//   Org_name: ‘Women Who Code’,
//   private: true}
//   {title: string,
//   local_date_time: string,
//   Org_name: string,
//   private: boolean}
app.get('/event/:eventId', (req, res) => {
  return Events.findOne({ eventId: req.params.eventId })
    .then((event) => {
      res.send(event);
    })
});

app.listen(PORT, () => {
  console.log(`Event module listening on port ${PORT}`);
});
