import React from "react";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakMin: 5,
      breakSec: 0,
      sessionMin: 25,
      sessionSec: 0,
      label: "Session"
    };
    this.handleBreakDecrement = this.handleBreakDecrement.bind(this);
    this.handleSessionDecrement = this.handleSessionDecrement.bind(this);
    this.handleBreakIncrement = this.handleBreakIncrement.bind(this);
    this.handleSessionIncrement = this.handleSessionIncrement.bind(this);
    this.sessionPlayPause = this.sessionPlayPause.bind(this);
    this.breakPlayPause = this.breakPlayPause.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleBreakDecrement() {
    if (this.state.breakMin === 1) {
      this.setState({
        breakMin: 1,
        breakSec: 0
      });
    } else {
      this.setState({
        breakMin: this.state.breakMin - 1
      });
    }
  }
  handleSessionDecrement() {
    if (this.state.sessionMin === 1) {
      this.setState({
        sessionMin: 1,
        sessionSec: 0
      });
    } else {
      this.setState({
        sessionMin: this.state.sessionMin - 1
      });
    }
  }
  handleBreakIncrement() {
    this.setState({
      breakMin: this.state.breakMin + 1
    });
  }
  handleSessionIncrement() {
    this.setState({
      sessionMin: this.state.sessionMin + 1
    });
  }
  sessionPlayPause() {
    this.myInterval = setInterval(() => {
      const { sessionSec, sessionMin } = this.state;

      if (sessionSec > 0) {
        this.setState(({ sessionSec }) => ({
          sessionSec: sessionSec - 1
        }));
      }
      if (sessionSec === 0) {
        if (sessionMin === 0) {
          clearInterval(this.myInterval);
          this.setState({ label: "Break" });
        } else {
          this.setState(({ sessionMin }) => ({
            sessionMin: sessionMin - 1,
            sessionSec: 59
          }));
        }
      }
    }, 1000);
  }
  breakPlayPause() {
    this.myInterval = setInterval(() => {
      const { breakSec, breakMin } = this.state;

      if (breakSec > 0) {
        this.setState(({ breakSec }) => ({
          breakSec: breakSec - 1
        }));
      }
      if (breakSec === 0) {
        if (breakMin === 0) {
          clearInterval(this.myInterval);
          this.setState({ label: "Session" });
        } else {
          this.setState(({ breakMin }) => ({
            sessionMin: breakMin - 1,
            breakSec: 59
          }));
        }
      }
    }, 1000);
  }
  handleReset() {
    this.setState({ sessionSec: 0, sessionMin: 25, breakMin: 5, breakSec: 0 });
  }

  render() {
    if (this.state.label === "Session") {
      var mins = this.state.sessionMin;
      var secs = this.state.sessionSec;
      var playPauseFunc = this.sessionPlayPause;
    } else {
      mins = this.state.breakMin;
      secs = this.state.breakSec;
      playPauseFunc = this.breakPlayPause;
    }
    return (
      <div id="main">
        <center>
          <div id="libs">
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
              integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
              crossOrigin="anonymous"
            ></link>
            <link
              rel="stylesheet"
              href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
              integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
              crossOrigin="anonymous"
            ></link>
          </div>
          <h1>25 + 5 Clock</h1>
          <hr />
          <LengthControl
            breakMin={this.state.breakMin}
            breakSec={this.state.breakSec}
            sessionMin={this.state.sessionMin}
            sessionSec={this.state.sessionSec}
            breakDecFunc={this.handleBreakDecrement}
            sessionDecFunc={this.handleSessionDecrement}
            breakIncFunc={this.handleBreakIncrement}
            sessionIncFunc={this.handleSessionIncrement}
          />
          <br />
          <br />
          <div id="info">
            <h3 id="timer-label">{this.state.label}</h3>
            <h4>
              Time Remaining:{" "}
              <span id="time-left">
                {mins}:{secs < 10 ? `0${secs}` : secs}
              </span>
            </h4>
            <br />
          </div>
          <br />
          <div id="buttons">
            <button
              id="start_stop"
              style={{ backgroundColor: "rgb(24,33,32)" }}
              className="btn"
              onClick={playPauseFunc}
            >
              <i className="fas fa-play"></i>
              <i className="fas fa-pause"></i>
            </button>
            <button
              id="reset"
              style={{ backgroundColor: "rgb(24,33,32)" }}
              className="btn"
              onClick={this.handleReset}
            >
              Reset
            </button>
          </div>
        </center>
      </div>
    );
  }
}

class LengthControl extends React.Component {
  render() {
    return (
      <div id="break_session">
        <div id="break">
          <h3 id="break-label">
            Break Length: <span id="break-length">{this.props.breakMin}</span>:
            {this.props.breakSec < 10
              ? `0${this.props.breakSec}`
              : this.props.breakSec}
          </h3>
          <button
            style={{ color: "rgb(24, 30, 32)", backgroundColor: "skyblue" }}
            className="btn"
            id="break-decrement"
            onClick={this.props.breakDecFunc}
          >
            <i class="fas fa-arrow-down"></i>
          </button>{" "}
          <button
            style={{ color: "rgb(24, 30, 32)", backgroundColor: "skyblue" }}
            className="btn"
            id="break-increment"
            onClick={this.props.breakIncFunc}
          >
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
        <div id="session">
          <h3 id="session-label">
            Session Length:{" "}
            <span id="session-length">{this.props.sessionMin}</span>:
            {this.props.sessionSec < 10
              ? `0${this.props.sessionSec}`
              : this.props.sessionSec}
          </h3>
          <button
            style={{ color: "rgb(24, 30, 32)", backgroundColor: "skyblue" }}
            className="btn"
            id="session-decrement"
            onClick={this.props.sessionDecFunc}
          >
            <i class="fas fa-arrow-down"></i>
          </button>{" "}
          <button
            style={{ color: "rgb(24, 30, 32)", backgroundColor: "skyblue" }}
            className="btn"
            id="session-increment"
            onClick={this.props.sessionIncFunc}
          >
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      </div>
    );
  }
}
