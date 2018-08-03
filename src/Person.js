import React, { Component } from 'react';

class Person extends Component {

  constructor(props) {
    super(props);
    this.state = {
        deltaY: 0,
        direction: 1,
    };
    this.timerID = this.timer();
  }

  timer = () => setTimeout(() => { 
    this.resetPerson();
  }, 2000);

  componentWillReceiveProps(nextProps){
    if (nextProps.deltay !== this.props.deltay) {
      this.setState({ deltaY: nextProps.deltay })
      this.setState({ direction: nextProps.deltay })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.deltay !== prevProps.deltay) {
        clearTimeout(this.timerID);
        this.timerID = this.timer(); //start and track a new timer
    }
  }

  resetPerson = () => {
    this.setState({ deltaY: 0 });
  }

  shouldIJump = () => {
    console.log(this.state.deltaY);
    return Math.abs(this.state.deltaY) > 300 ? true : false;  
  }

  makeMeJump = () => {
    return this.shouldIJump() ? "person makemejump" : "person ";
  }

  render() {
    const deltay = this.state.deltaY;
    const direction = this.state.direction;
    const makemejump = this.makeMeJump();

    return (
        <div className={makemejump} style={{bottom: this.props.floor, color: "white"}}>
        {
            deltay > 0 &&
            <span>You're moving forward in life!</span>
        } 
        {
            deltay < 0 &&
            <span>You're moving backwards!</span>
        } 
        {
            deltay === 0 &&
                <span>You're stale!</span> &&
                <span>And you're facing {direction}</span>
        } 
        </div>
    );
  }
}

export default Person;
