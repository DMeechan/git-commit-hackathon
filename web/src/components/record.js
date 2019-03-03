import React, { Component } from 'react';
import {
    Icon,
} from 'antd';

class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsDisplay: "00",
            seconds: 0,
            recording: false
        }

        this.intervalHandle = null;
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.tick = this.tick.bind(this);
    }

    start() {
        if (this.state.recording) {
            this.stop();
        } else {
            this.intervalHandle = setInterval(this.tick, 1000);
            this.props.start();
            this.setState({
                recording: true
            })
        }
    }

    stop() {
        clearInterval(this.intervalHandle)
        this.props.stop();
        this.setState({
            recording: false,
            seconds: 0,
        })
    }

    tick() {
        const seconds = this.state.seconds + 1

        if (seconds > 20) {
            this.stop();
            return;
        } else {
            // If it's under 10 seconds, add a zero like in "00" or "09"
            this.setState({
                secondsDisplay: (seconds < 10) ? "0" + seconds : seconds
            });
        }

        this.setState({
            seconds
        })
    }

    render() {
        return (
            <div>
                <StartButton start={this.start} recording={this.state.recording} />
                <Timer seconds={this.state.seconds} />
            </div>
        );
    }
}

function Timer(props) {
    const {seconds} = props;
    return (
        <div>{seconds}</div>
    )
}

function StartButton(props) {
    const { recording, start } = props;

    return (
        <Icon
            onClick={start}
            type={recording ? 'pause-circle' : 'play-circle'}
            style={{ fontSize: '72px', color: '#2ecc71' }}
        />
    );
}

export default Record;
