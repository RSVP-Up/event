import React from 'react';
import moment from 'moment';
import queryString from 'query-string';
import {
  Divider,
  Item,
  Grid,
  Container,
  Visibility,
  Segment,
  Sticky,
} from 'semantic-ui-react';
import style from '../styles';
import Hosts from './hosts';
import ShareModal from './ShareModal';
import fetchAllEventData from '../fetch';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixed: false,
      timeDate: null,
      title: null,
      hosts: null,
    };
    this.showFixedMenu = this.showFixedMenu.bind(this);
    this.hideFixedMenu = this.hideFixedMenu.bind(this);
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

  showFixedMenu() {
    this.setState({ fixed: true });
  }

  hideFixedMenu() {
    this.setState({ fixed: false });
  }

  render() {
    const {
      fixed,
      timeDate,
      title,
      hosts,
    } = this.state;
    return (
      <div>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Sticky active={fixed}>
            {/* // padding needs to be 0 so the gray background
            goes from the bottom of the header to the top of the footer */}
            <Segment basic={!fixed} style={{ paddingTop: '0em' }}>
              {/* Alignment  */}
              <Container>
                <Item style={style.item}>
                  <Item.Content verticalAlign="middle">
                    <Item.Meta>
                      <p style={style.timeDate}>{timeDate}</p>
                    </Item.Meta>
                    <Item.Header style={fixed ? style.fixedTitle : style.title}>
                      {title}
                    </Item.Header>
                    {/* // the hosts information doesn't show up in the fixed menu */}
                    {(fixed) ? null : (
                      <Item.Description>
                        <Grid columns={2} stackable>
                          <Grid.Column floated="left">
                            {(hosts) ? <Hosts style={style} hosts={hosts} /> : null}
                          </Grid.Column>
                          <Grid.Column verticalAlign="bottom" floated="right">
                            <ShareModal style={style.modal} button={style.button} />
                          </Grid.Column>
                        </Grid>
                      </Item.Description>
                    )}
                  </Item.Content>
                </Item>
              </Container>
            </Segment>
          </Sticky>
          {/* // when the menu is fixed the divider isn't necessary */}
          {(!fixed) ? <Divider style={{ marginBottom: '0' }} /> : null}
        </Visibility>
      </div>
    );
  }
}

export default Event;
