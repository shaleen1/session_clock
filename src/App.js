import React from "react";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { breakLength: 5, sessionLength: 25 };
    this.handleBreakDecrement = this.handleBreakDecrement.bind(this);
    this.handleSessionDecrement = this.handleSessionDecrement.bind(this);
    this.handleBreakIncrement = this.handleBreakIncrement.bind(this);
    this.handleSessionIncrement = this.handleSessionIncrement.bind(this);
  }
  handleBreakDecrement() {
    this.setState({
      breakLength: this.state.breakLength - 1,
      sessionLength: this.state.sessionLength
    });
  }
  handleSessionDecrement() {
    this.setState({
      sessionLength: this.state.sessionLength - 1,
      breakLength: this.state.breakLength
    });
  }
  handleBreakIncrement() {
    this.setState({
      breakLength: this.state.breakLength + 1,
      sessionLength: this.state.sessionLength
    });
  }
  handleSessionIncrement() {
    this.setState({
      sessionLength: this.state.sessionLength + 1,
      breakLength: this.state.breakLength
    });
  }
  render() {
    return (
      <div id="main">
        <div id="break">
          <h3 id="break-label">Break Length: {this.state.breakLength}</h3>
          <button id="break-decrement" onClick={this.handleBreakDecrement}>
            Decrement
          </button>
          <button id="break-increment" onClick={this.handleBreakIncrement}>
            Increment
          </button>
        </div>
        <div id="session">
          <h3 id="session-label">Session Length: {this.state.sessionLength}</h3>
          <button id="session-decrement" onClick={this.handleSessionDecrement}>
            Decrement
          </button>
          <button id="session-increment" onClick={this.handleSessionIncrement}>
            Increment
          </button>
        </div>
      </div>
    );
  }
}
