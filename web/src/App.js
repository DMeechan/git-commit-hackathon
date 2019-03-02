import React, { Component } from 'react';
import { Form, Select, InputNumber, DatePicker, Switch, Icon, Button, Card, Row, Col, Steps } from 'antd';
import './App.css';
import socketIOClient from "socket.io-client";

const { Option } = Select;
const Step = Steps.Step;

/*
<div style={{ textAlign: "center" }}>
{response
  ? <p>
      Websocket response: {response}
    </p>
  : <p>Loading...</p>}
  <div>
    {recording ? <StopButton /> : <StartButton />}
  </div>
</div>
*/

class App extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:8080",
      recording: false
    }
    this.count = 0;
    
  }

  handleClick = () => {
    this.state["recording"] = !this.state["recording"];
    if(this.count < 4) {
      this.count += 1;
    } else {
      this.count = 0;
    }
    this.forceUpdate()
  }

  StartButton = () => (
    <Button type="primary" size="large" id="startRecButton">Start Recording</Button>
  );
  
  StopButton = () => (
    <Button type="danger" size="large" id="stopRecButton">Stop Recording</Button>
  );
  

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("join", data => this.setState({ response: data }));
  }

  render() {
    const { response, recording } = this.state;
    return (
      <div className="App">
      <Card title={<h1 style={{ marginBottom: '0px' }}><b>MT1003 Module Feedback</b></h1>}>
      <p>Please describe your experience.</p>
      <Steps current={this.count}>
        <Step title="Start" />
        <Step title="Recording" />
        <Step title="Processing" />
        <Step title="Done" />
      </Steps>
      <br></br>
        {recording ? <this.StopButton /> : <this.StartButton />}
        <button style={{ marginLeft: '10px'}}>Reset</button>
      </Card>
      <div style={{ background: 'rgb(240, 242, 245)', paddingTop: '10px', height: '100%'}}>
    
        <Row gutter={16}>
          <Col span={14}>
            <Card title={<h2 style={{ marginBottom: '0px' }}><b>Speech to Text</b></h2>} bordered={false} style={{ minHeight: '500px' }}><p>Card content</p></Card>
          </Col>
          <Col span={10}>
            <Card title={<h2 style={{ marginBottom: '0px' }}><b>Results</b></h2>} bordered={false} style={{ minHeight: '500px'}}><p>Card content</p></Card>
          </Col>
        </Row>
      </div>
      </div>
    );
  }
}


export default App;
