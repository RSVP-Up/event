import React from 'react';
import moment from 'moment';
import {
  Divider,
  Item,
  Grid,
  Container,
  Visibility,
  Segment,
  Placeholder,
  Sticky,
} from 'semantic-ui-react';
import style from '../styles';
import Hosts from './hosts';
import ShareModal from './ShareModal';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fixed: false };
    this.showFixedMenu = this.showFixedMenu.bind(this);
    this.hideFixedMenu = this.hideFixedMenu.bind(this);
  }

  showFixedMenu() {
    this.setState({ fixed: true });
  }

  hideFixedMenu() {
    this.setState({ fixed: false });
  }

  render() {
    const {
      data: {
        event: { title, local_date_time },
        hosts,
      },
    } = this.props;
    const { fixed } = this.state;
    const date = moment(local_date_time).format('LL');
    const weekday = moment(local_date_time).format('dddd');
    const timeDate = `${weekday}, ${date}`;
    return (
      <div style={style.div}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Sticky active={fixed} context={this.contextRef}>
            <Segment basic={!fixed} style={{ paddingTop: '0em' }}>
              <Container text>
                <Item style={style.item}>
                  <Item.Content verticalAlign="middle">
                    <Item.Meta>
                      <p style={style.timeDate}>{timeDate}</p>
                    </Item.Meta>
                    <Item.Header style={fixed ? style.fixedTitle : style.title}>
                      {title}
                    </Item.Header>
                    {(fixed) ? null : (
                      <Item.Description>
                        <Grid columns={2} stackable>
                          <Grid.Column floated="left">
                            <Hosts style={style} hosts={hosts} />
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
          {(!fixed) ? <Divider style={{ marginBottom: '0' }} /> : null}
        </Visibility>
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
