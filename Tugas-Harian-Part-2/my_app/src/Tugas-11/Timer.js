/* cSpell:disable */
import React from 'react';

export default class Timer extends React.Component {
  render() {
    return (
      <div className="timer" style={{width: '85%', margin: 'auto'}}>
        <h1>sekarang jam: {this.props.time}</h1>
        <h1>hitung munder: {this.props.counter}</h1>
      </div>
    )
  }
}
