import React, { Component } from 'react';
import { Tag } from 'antd';

import { connectionStatus } from './websockets';

class ServerStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
    };

    connectionStatus(connected =>
      this.setState({
        connected,
      })
    );
  }

  ConnectedTag = () => <Tag color="green">Connected to server</Tag>;
  DisconnectedTag = () => <Tag color="volcano">Server offline :(</Tag>;

  render() {
    const { connected } = this.state;
    return (
      <span style={{marginTop: '-0.2em', float: 'right'}}>
        {connected ? <this.ConnectedTag /> : <this.DisconnectedTag />}
      </span>
    );
  }
}

export default ServerStatus;
