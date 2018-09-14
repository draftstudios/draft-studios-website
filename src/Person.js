import React, { Component } from 'react';

class Person extends Component {

  constructor(props) {
    super(props);
    this.state = {
        deltaY: 0,
        direction: 1,
        running: 0,
        runToggle: 0,
        // 0 will cause running frame 1
        // 1 will cause feet pointing in correct direction (frame 2)
        // 2 is swimming motion
        // technically deltaY is determining whether to kick to 0... need to find a way to have it animate other frames if the process is pretty long ms wise.
    };
    this.timerID = this.timer();
    this.intervalID = this.animateRun();
  }

  timer = () => setTimeout(() => { 
    this.resetPerson();
  }, 500);

  animateRun = () => setInterval(() => { 
      //this.setState({ runToggle: 1 });
      //setTimeout(() => { this.resetRunning(); console.log('getting hit'); }, 500);
  }, 1500);

  componentWillReceiveProps(nextProps){
    if (nextProps.deltay !== this.props.deltay) {
      this.setState({ deltaY: nextProps.deltay });
      this.setState({ direction: nextProps.deltay });
    }

    if (nextProps.pos !== this.props.pos) {
      this.setState({ running: 1 });
        // here i'm marking running status if we're scrolling
    } else {
      this.setState({ running: 0, runToggle: 0 });
      this.resetRunning();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.deltay !== prevProps.deltay) {
        clearTimeout(this.timerID);
        this.timerID = this.timer(); //start and track a new timer
    }
  }

  resetPerson = () => {
    this.setState({ deltaY: 0, running: 0 });
    clearInterval(this.intervalID);
  }

  resetRunning = () => {
    clearInterval(this.intervalID);
  }

  shouldIJump = () => {
    console.log(this.state.deltaY);
    return Math.abs(this.state.deltaY) > 300 ? true : false;  
  }

  makeMeJump = () => {
    return this.shouldIJump() ? "person makemejump" : "person ";
  }

  facing = (direction) => {
    return direction ? " av-forward" : " av-backward";
  }

  startRun = () => {
    this.setState({ running: 1 });        
  }

  render() {
    const deltay = this.state.deltaY;
    const direction = this.state.direction;
    const makemejump = this.makeMeJump();
    const facing = this.facing(direction);
    const currentRunToggle = this.state.runToggle;
    const animateRun = this.state.running ? this.animateRun() : null;

    return (
        <div className={makemejump + facing} style={{bottom: this.props.floor, color: "white"}}>
        {
            deltay > 0 &&
            <div className="person-slides" style={{left:-200 - currentRunToggle * 200}}>
                {/*
                <span> You're moving forward in life!</span>
                */}
            </div>
        } 
        {
            deltay < 0 &&
            <div className="person-slides" style={{top:-200, left:-200 - currentRunToggle * 200}}>
                {/*
                <span>You're moving backwards!</span>
                */}
            </div>
        } 
        {
            deltay === 0 &&
                <div className="person-slides" style={{top: direction > 0 ? 0 : -200}}>
                {/*
                <span>You're stale!</span> &&
                <span>And you're facing {direction}</span>
                */}
            </div>
        } 
        </div>
    );
  }
}

export default Person;
