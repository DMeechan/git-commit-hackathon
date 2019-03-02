import React, { Component } from 'react';
import { Form, Select, InputNumber, DatePicker, Switch, Slider, Button, Card, Row, Col, Steps } from 'antd';
import './App.css';
import socketIOClient from "socket.io-client";

const { Option } = Select;
const Step = Steps.Step;

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:8080",
    }
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("join", data => this.setState({ response: data }));
  }
  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <p>
              The temperature in Florence is: {response} °F
            </p>
          : <p>Loading...</p>}
      </div>
    );
  }
}

const AppOrg = () => (
  <div className="App">
  <Card title={<h1 style={{ marginBottom: '0px' }}><b>MT1003 Module Feedback</b></h1>}>
  <p>Please describe your experience.</p>
  <Steps current={0}>
    <Step title="Start" />
    <Step title="In Progress" />
    <Step title="Finished" />
  </Steps>
  <br></br>
  <Button type="primary" size="large">Record</Button>
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

export default App;
