import React, { Component } from 'react';

class Person extends Component {

  constructor(props) {
    super(props);
    this.state = {
        slidein: null,
        deltaY: 0,
        direction: 1,
        running: 0,
        runToggle: 0,
            // 0 will cause running frame 1
            // 1 will cause feet pointing in correct direction (frame 2)
            // 2 is swimming motion
            // technically deltaY is determining whether to kick to 0... need to find a way to have it animate other frames if the process is pretty long ms wise.
        falling: 0,
        idle: 0,
    };
    this.timerID = this.timer();
    this.animateRun();
  }

  timer = () => setTimeout(() => { 
    this.resetPerson();
  }, 500);

  animateRun = () => setInterval(() => { 
      // probably the ugliest code you'll see in this demo... didn't have much time left
      if (this.state.running > 0) {
          this.setState({runToggle: 2},
              () => { setTimeout(() => { this.setState({runToggle: 0},
                  () => { setTimeout(() => { this.setState({runToggle: 1},
                  ) }, 300) }
              ) }, 300) }
          ); 
      }
  }, 300);

  componentDidUpdate(prevProps) {
    if (prevProps.deltay !== this.props.deltay) {
      this.setState({ deltaY: this.props.deltay });
      this.setState({ direction: this.props.deltay });
    }

    if (prevProps.pos !== this.props.pos) {
      this.setState({ running: 1 });
        // here i'm marking running status if we're scrolling
    } 

    if (this.props.deltay !== prevProps.deltay) {
        clearTimeout(this.timerID);
        this.timerID = this.timer(); //start and track a new timer
    }
  }

  componentDidMount() {
      // first time mounting this, drop from the sky (by giving slideIn class which applies the transformation).
      if (this.state.slidein !== "slideIn") {
        this.setState({slidein: "slideIn"});
          //console.log("setting state", this.state.slidein);
        this.forceUpdate();
      }
  }

  resetPerson = () => {
    this.setState({ deltaY: 0, running: 0 });
  }

  facing = (direction) => {
    return direction ? "person av-forward" : "person av-backward";
  }

  render() {
    const deltay = this.state.deltaY;
    const direction = this.state.direction;
    const facing = this.facing(direction);
    const currentRunToggle = this.state.runToggle;
    const atMaxScroll = this.props.pos === this.props.maxscroll ? 1 : 0;
    const imgclass = ' ' + this.props.imgclass;
    const slidein = this.state.slidein;

    return (
        atMaxScroll ? 
            (
                <div className={facing} style={{bottom: this.props.floor, color: "white"}}>
                    // hardcode teleporter phase to last frame
                    <div className={'person-slides ' + imgclass} style={{left:-1200}}>
                    </div>
                </div>
            ) 
        :
            // otherwise i'm running
            (
            <div className={facing + ' dropmefromsky ' + slidein} style={{bottom: this.props.floor, color: "white"}}>
            {
                deltay > 0 &&
                <div className={'person-slides ' + imgclass} style={{left:-200 - currentRunToggle * 200}}>
                    {/*
                    <span> You're moving forward in life!</span>
                    */}
                </div>
            } 
            {
                deltay < 0 &&
                <div className={'person-slides ' + imgclass} style={{top:-200, left:-200 - currentRunToggle * 200}}>
                    {/*
                    <span>You're moving backwards!</span>
                    */}
                </div>
            } 
            {
                deltay === 0 &&
                    <div className={'person-slides ' + imgclass} style={{top: direction > 0 ? 0 : -200}}>
                        {/*
                    <span>You're stale!</span> &&
                    <span>And you're facing {direction}</span>
                    */}
                </div>
            } 
            </div>
            )
    );
  }
}

export default Person;
