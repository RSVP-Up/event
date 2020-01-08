import React from 'react';
import moment from 'moment';
import queryString from 'query-string';
import {
  Divider,
  Item,
  Grid,
  Container,
} from 'semantic-ui-react';
import style from '../styles';
import Hosts from './hosts';

import ShareModal from './ShareModal';
import fetchAllEventData from '../fetch';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeDate: null,
      title: null,
      hosts: null,
    };
  }

  componentDidMount() {
    // window.location.search is the end of address after '?' event_id=0
    const value = queryString.parse(window.location.search);
    const id = value.event_id;
    fetchAllEventData(id)
      .then((response) => {
        const date = moment(response.event.local_date_time).format('LL');
        const weekday = moment(response.event.local_date_time).format('dddd');
        const timeDate = `${weekday}, ${date}`;
        const { title } = response.event;
        this.setState({ timeDate, title, hosts: response.hosts });
      });
  }

  render() {
    const {
      timeDate,
      title,
      hosts,
    } = this.state;

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
                    {/* if the component hasn't mounted don't bother rendering */}
                    {hosts ? <Hosts style={style} hosts={hosts} /> : ''}
                  </Grid.Column>
                  <Grid.Column verticalAlign="bottom" floated="right">
                    <ShareModal style={style.modal} button={style.button} />
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
