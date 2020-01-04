import React from 'react';
import {
  Modal,
  Header,
  Button,
  Icon,
  Image,
  List,
  Container,
  Item,
  Grid,
} from 'semantic-ui-react';

const shareTo = [
  {
    content: 'Facebook',
    iconName: 'facebook',
  },
  {
    content: 'Twitter',
    iconName: 'twitter',
  },
  {
    content: 'LinkedIn',
    iconName: 'linkedin',
  },
  {
    content: 'Copy Link',
    iconName: 'linkify',
  },
];

const ShareModal = ({ button, style }) => (
  <Modal
    trigger={(
      <Button size="medium" basic floated="right" style={button}>
        <Icon name="share square" />
        Share
      </Button>
    )}
    size="mini"
    centered={false}
  >
    <Modal.Content>
      {/* TO DO create a click event on the image to close modal */}
      <Image link basic size="large" icon="times" />
      <Container text>
        <Header as="h2" content="Share this event" />
      </Container>
      <Container style={{ padding: '20px' }}>
        <Grid style={{ fontFamily: '"Roboto", sans-serif' }} divided="vertically">
          {shareTo.map((destination) => (
            <Grid.Row key={destination.content}>
              <Container text>
                <Icon size="big" link name={destination.iconName} color="grey" />
                <a href="#" style={{ color: 'rgb(0, 162, 199)', cursor: 'pointer', fontSize: '16px' }}>
                  {destination.content}
                </a>
              </Container>
            </Grid.Row>
          ))}
        </Grid>
      </Container>
    </Modal.Content>
  </Modal>
);

export default ShareModal;
