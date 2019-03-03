import React, { Component } from 'react';
import {
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Icon,
  Button,
  Card,
  Row,
  Col,
  Steps,
} from 'antd';
import './App.css';
import { startRecording, stopRecording, sendTextForAnalysis } from './websockets';

const { Option } = Select;
const Step = Steps.Step;

class App extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      response: false,
      recording: false,
      text: '',
      rating: null,
      emotions: null
    };
    this.count = 0;
  }

  handleClick = () => {
    const self = this;
    let { recording, text } = this.state;

    if (!recording) {
      startRecording(function (newText, dataFinal) {
        // console.log('newText: ', newText);
        self.state.text = newText;
        self.forceUpdate();
      });
    } else {
      stopRecording();
    }

    this.state['recording'] = !this.state['recording'];
    if (this.count < 4) {
      this.count += 1;
    } else {
      this.count = 0;
    }

    if (this.state['recording'] === false && this.state['text'].length > 5) {
      sendTextForAnalysis(this.state.text, rating => {
        self.state.rating = rating;
      }, emotions => {
        self.state.emotions = emotions;
      });
    }

    this.forceUpdate();
  };

  StartButton = () => (
    <Button
      type="primary"
      size="large"
      id="startRecButton"
      onClick={this.handleClick}
    >
      Start Recording
    </Button>
  );

  StopButton = () => (
    <Button
      type="danger"
      size="large"
      id="stopRecButton"
      onClick={this.handleClick}
    >
      Stop Recording
    </Button>
  );

  componentDidMount() {
    const { endpoint } = this.state;
  }

  render() {
    const { response, recording, text } = this.state;
    return (
      <div className="App">
        <Card
          title={
            <h1 style={{ marginBottom: '0px' }}>
              <b>MT1003 Module Feedback</b>
            </h1>
          }
        >
          <p>Please describe your experience.</p>
          <Steps current={this.count}>
            <Step title="Start" />
            <Step title="Recording" />
            <Step title="Processing" />
            <Step title="Done" />
          </Steps>
          <br />
          {recording ? <this.StopButton /> : <this.StartButton />}
          <button style={{ marginLeft: '10px' }}>Reset</button>
        </Card>
        <div
          style={{
            background: 'rgb(240, 242, 245)',
            paddingTop: '10px',
            height: '100%',
          }}
        >
          <Row gutter={16}>
            <Col span={14}>
              <Card
                title={
                  <h2 style={{ marginBottom: '0px' }}>
                    <b>Speech to Text</b>
                  </h2>
                }
                bordered={false}
                style={{ minHeight: '500px' }}
              >
                <div>
                  <span id="speechToTextField">{text}</span>
                  <p id="result-text" />
                </div>
              </Card>
            </Col>
            <Col span={10}>
              <Card
                title={
                  <h2 style={{ marginBottom: '0px' }}>
                    <b>Results</b>
                  </h2>
                }
                bordered={false}
                style={{ minHeight: '500px' }}
              >
                <p>Card content</p>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
