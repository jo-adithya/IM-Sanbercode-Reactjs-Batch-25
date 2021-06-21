/* cSpell:disable */
import React from 'react';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <h1>sekarang jam: {this.props.time}</h1>
        <h1>hitung munder: {this.props.counter}</h1>
      </>
    )
  }
}
