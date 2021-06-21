import React from 'react';
import Timer from './Timer';

export default class TimerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString(),
      counter: 100,
      show: true,
    };
  }
  componentDidMount() {
    if (this.props.start !== undefined) {
      this.setState({ counter: this.props.start });
    }
    this.timerID = setInterval(() => this.countDown(), 1000);
  }
  countDown() {
    if (this.state.counter > 0) {
      this.setState({
        time: new Date().toLocaleTimeString(),
        counter: this.state.counter - 1,
      });
    } else {
      clearInterval(this.timerID);
      this.setState({ show: false })
    }
  }
  render() {
    if (this.state.show) {
      return <Timer time={this.state.time} counter={this.state.counter} />;
    }
    return null;
  }
}
