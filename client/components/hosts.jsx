import React from 'react';
import { Feed } from 'semantic-ui-react';

const Hosts = ({ hosts, style }) => {
  const thumbnail = `${hosts[0].thumbnail}`;
  return (
    // The feed allows me to show a thumbnail on the left with text on the right aligned
    // the Feed docs https://react.semantic-ui.com/views/feed/
    <Feed>
      <Feed.Event>
        <Feed.Label style={style.thumbnail} image={thumbnail} />
        <Feed.Content>
          <Feed.Date style={style.hostedBy} content="Hosted by" />
          <Feed.Summary>
            {hosts.map((host, index) => {
              const hostName = index > 0 ? ` and ${host.name}` : host.name;
              return hostName;
            })}
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  );
};

export default Hosts;
