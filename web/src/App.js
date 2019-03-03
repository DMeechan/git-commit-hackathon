import React, { Component } from 'react';
import {
  Form,
  Select,
  InputNumber,
  Icon,
  Rate,
  Progress,
  Button,
  Card,
  Row,
  Col,
  Steps,
  Layout, Menu, Breadcrumb 
} from 'antd';
import './App.css';
import {
  startRecording,
  stopRecording,
  sendTextForAnalysis,
} from './websockets';

const { Header, Content, Footer } = Layout;

import Record from './components/record';
import Wrapper from './components/wrapper';

const { Option } = Select;
const Step = Steps.Step;

class App extends Component {
  constructor() {
    super();
    // this.handleClick = this.handleClick.bind(this);
    this.state = {
      status: "waiting", // waiting, recording, analysing, outputting
      response: false,
      recording: false,
      tempText: '',
      text: '',
      stars: 0,
      count: 0,
      emotions: {
        anger: 0,
        joy: 0,
        sadness: 0,
        fear: 0,
        disgust: 0,
      }
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  start() {
    const self = this;
    self.setState({
      text: '',
      tempText: '',
    });

    startRecording(function (newText, dataFinal) {
      // console.log('newText: ', newText);
      self.setState({
        tempText: newText,
      });

      if (dataFinal) {
        self.setState((state, props) => ({
          text: state.text + newText,
          tempText: '',
        }));
      }
      // self.forceUpdate();
    });
  }

  stop() {
    stopRecording();
  }

  render() {
    const {start, stop} = this;
    const {text, tempText} = this.state;

    return (
      <Wrapper>
        <Record start={start} stop={stop} />
        <p>{tempText}</p>
        <p>{text}</p>
        <p>hello world</p>
      </Wrapper>
    );
  }
}

export default App;



