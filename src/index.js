import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.startTimer = this.startTimer.bind(this);
    this.clWait = this.clWait.bind(this);
    this.timer = null;
    this.started = false;

    this.calc1 = 1;
    this.wait = true;

    this.state = {
      seconds: 0,
      minuts: 0,
      hours: 0,
    };
  }
  clWait() {
    clearInterval(this.timer);
    this.wait = true;
  }
  startTimer(event) {
    if (event === 1) {
      if (this.wait === false) {
        this.stopT();
      } else if (this.wait === true) {
        this.startT();
      }
    } else if (event === 2) {
      console.log("Один клик");
    } else if (event === 3) {
      this.resetT();
    }
  }
  startT() {
    this.wait = false;
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
  }
  resetT() {
    this.wait = false;
    clearInterval(this.timer);
    this.setState({
      hours: (this.state.hours = 0),
      minuts: (this.state.minuts = 0),
      seconds: (this.state.seconds = 0),
    });
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
  }
  stopT() {
    this.wait = true;
    clearInterval(this.timer);
    this.setState({
      hours: (this.state.hours = 0),
      minuts: (this.state.minuts = 0),
      seconds: (this.state.seconds = 0),
    });
  }

  tick() {
    if (this.state.minuts === 59) {
      this.setState({
        hours: this.state.hours + 1,
        minuts: this.state.minuts - 59,
      });
    } else if (this.state.seconds === 59) {
      this.setState({
        minuts: this.state.minuts + 1,
        seconds: this.state.seconds - 59,
      });
    } else
      this.setState({
        seconds: this.state.seconds + 1,
      });
  }

  render() {
    return (
      <div>
        <h2>Time</h2>
        <div>
          <Button event="1" name="START/STOP" startTimer={this.startTimer} />
          <Button
            event="2"
            name="WAIT"
            startTimer={this.startTimer}
            clWait={this.clWait}
          />
          <Button event="3" name="RESET" startTimer={this.startTimer} />
        </div>
        <Display time={this.state} />
      </div>
    );
  }
}
class Button extends React.Component {
  handleStartTime() {
    return this.props.startTimer(this.props.event);
  }
  clickWait() {
    if (this.props.event === 2) {
      return this.props.clWait(this.props.event);
    }
  }
  render() {
    return (
      <button
        onClick={this.handleStartTime.bind(this)}
        onDoubleClick={this.clickWait.bind(this)}
      >
        {" "}
        {this.props.name}{" "}
      </button>
    );
  }
}
class Display extends React.Component {
  render() {
    return (
      <h2>
        {this.props.time.hours} : {this.props.time.minuts} :{" "}
        {this.props.time.seconds}
      </h2>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Timer />, rootElement);
