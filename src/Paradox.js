import React, { Component } from 'react';

class Paradox extends Component {

    constructor(props) {
      super(props);
      this.state = {
          startingPositionX: this.props.x,
          startingPositionY: this.props.y,
      };
      this.currentPosition = this.props.x;
    }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = (e) => {
      console.log("window scroll y:", window.scrollY);
    const startingpositionx = this.state.startingPositionX - (window.scrollY * this.props.paradoxratio); 
    this.setState({startingPositionX: startingpositionx});
  }

        /*
    componentDidUpdate(prevProps) {
      if (this.props.move !== prevProps.move) {
          //this.setState({startingPositionX: 100});
      }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        //state depends on changes in props over time

        const prevStartingPositionX = prevState.startingPositionX;

        return {
            startingPositionX: prevStartingPositionX,
        }
    }

    onParadoxWheelScroll = (e) => {
      //do other stuff
        //possible to put logic here...
      const speed = this.props.paradoxratio;
      const currentStartingPositionY = this.state.startingPositionY;

        console.log("speed", speed, currentStartingPositionY);
      this.setState({startingPositionY: currentStartingPositionY + (e.deltaY * speed)});
        
      this.props.scroll(); // still allow whatever from props
    }
    */

  render() {
    const startingpositionx = this.state.startingPositionX - (this.props.move * this.props.paradoxratio); 
    const startingpositiony = this.state.startingPositionY;
    const floor = this.props.floor;
    const color = this.props.color;
    const asset = this.props.asset;

    return (
        <div className="paradox" style={{ left: startingpositionx+'px', 
                top: startingpositiony+'px', 
                bottom: floor,
                position: "absolute", 
                backgroundColor: color }}>
        This is just a test...<br/>
        Imagine me to be a single cloud...<br/>
        A big fluffy, puffy cloud...<br/>
        { asset ? <img src={"assets/"+asset}/> : null }
        </div>
    );
  }
}

Paradox.defaultProps = {
    color: "white",
};

export default Paradox;
