import React from 'react';
import moment from 'moment';
import {
  Button,
  Divider,
  Item,
  Icon,
  Grid,
  Container,
} from 'semantic-ui-react';
import style from '../styles';
import Hosts from './hosts';

// const eventAPI = 'http://localhost:5000/event';
// const eventId = randomeventId

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // fetchEventData() {
  //   const options = {
  //     method: 'GET',
  //   }
  // }

  render() {
    const {
      data: {
        event: { title, local_date_time },
        hosts,
      },
    } = this.props;
    const date = moment(local_date_time).format('LL');
    const weekday = moment(local_date_time).format('dddd');
    const timeDate = `${weekday}, ${date}`;
    return (
      <div style={style.div}>
        <Container text>
          <Item style={style.item}>
            <Item.Content verticalAlign="middle">
              <Item.Meta>
                <p style={style.timeDate}>{timeDate}</p>
              </Item.Meta>
              <Item.Header style={style.title}>
                {title}
              </Item.Header>
              <Item.Description>
                <Grid columns={2} stackable>
                  <Grid.Column floated="left">
                    <Hosts style={style} hosts={hosts} />
                  </Grid.Column>
                  <Grid.Column verticalAlign="bottom" floated="right">
                    <Button size="medium" basic floated="right" style={style.button}>
                      <Icon name="share square" />
                      Share
                    </Button>
                  </Grid.Column>
                </Grid>
              </Item.Description>
            </Item.Content>
          </Item>
        </Container>
        <Divider />
      </div>
    );
  }
}

export default Event;

// for fetching in parallel
// function fetchEventData() {
//   return Promise.all([
//     fetchEvent(),
//     fetchHosts()
//   ]).then(([event, hosts]) => {
//     return {event, hosts};
//   })
// }
