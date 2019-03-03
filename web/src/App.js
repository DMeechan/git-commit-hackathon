import React, { Component } from 'react';
import {
  Form,
  Select,
  InputNumber,
  DatePicker,
  Rate,
  Progress,
  Button,
  Card,
  Row,
  Col,
  Steps,
} from 'antd';
import './App.css';
import { startRecording, stopRecording } from './websockets';
import { timingSafeEqual } from 'crypto';

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
      recording: false,
      tempText: '',
      text: '',
      stars: 5,
      emotion: {
        anger: 0,
        joy: 0,
        sadness: 0,
        fear: 0,
        disgust: 0,
      },
    };
    this.count = 0;
  }

  handleClick = () => {
    const self = this;
    
    if (!this.state['recording']) {
      self.state.text = '';
      self.state.tempText = '';
      self.forceUpdate();
      startRecording(function(newText, dataFinal) {
        // console.log('newText: ', newText);
        self.state.tempText = newText;
        if(dataFinal) {
          self.state.text = self.state.text + newText;
          self.state.tempText = '';
        }
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
    const { response, recording, text, tempText, stars, emotion } = this.state;
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
        </Card>
        <div
          style={{
            background: 'rgb(240, 242, 245)',
            paddingTop: '10px',
            height: '100%',
          }}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Card
                title={
                  <h2 style={{ marginBottom: '0px' }}>
                    <b>Speech to Text</b>
                  </h2>
                }
                bordered={false}
                style={{ minHeight: '560px' }}
              >
                <div className="ttsField">
                  <span id="speechToTextField" style={{ color: '#000000' }}>{text} <span style={{ color: '#C0C0C0' }}>{tempText}</span></span>
                  <p id="result-text" />
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title={
                  <h2 style={{ marginBottom: '0px' }}>
                    <b>Results</b>
                  </h2>
                }
                bordered={false}
                style={{ minHeight: '560px' }}
              >
                <p><b>Feedback Sentiment</b><br></br><Rate disabled defaultValue={stars} /></p>
                
                <p>
                Anger
                <img width='25px' height='25px' src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/146/angry-face_1f620.png'></img> 
                
                <Progress percent={emotion.anger} />
                </p>
                <p>
                Joy
                <img width='25px' height='25px' src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/146/face-with-tears-of-joy_1f602.png'></img> 
                
                <Progress percent={emotion.joy} />
                </p>
                <p>
                Sadness 
                <img width='25px' height='25px' src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/146/crying-face_1f622.png'></img> 
                <Progress percent={emotion.sadness} />
                </p>
                <p>
                Fear
                <img width='25px' height='25px' src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/146/fearful-face_1f628.png'></img> 
                
                <Progress percent={emotion.fear} />
                </p>
                <p>
                Disgust
                <img width='25px' height='25px' src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/146/nauseated-face_1f922.png'></img> 
                
                <Progress percent={emotion.disgust} />
                </p>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
