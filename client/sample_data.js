// GET /event/01
const event = {
  title: 'Grass-roots web-enabled info-mediaries',
  local_date_time: '2019-10-07T08:05:25.286Z',
  org_name: 'Koch, Blick and Turcotte',
  private: true,
};

// GET event hosts
// /rsvp/hosts/0
const hosts = [
  {
    name: 'Madisyn Jerde',
    thumbnail: 'http://placecorgi.com/50',
  },
  {
    name: 'Anabelle Strosin',
    thumbnail: 'http://placecorgi.com/50',
  },
];

const data = {
  event,
  hosts,
};

export default data;
