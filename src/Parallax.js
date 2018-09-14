import React, { Component } from 'react';

class Paralax extends Component {

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
      if (this.props.popup === "1") console.log(this.props.move, this.props.x);
    const startingpositionx = this.state.startingPositionX - (this.props.move * this.props.paradoxratio); 
    const startingpositiony = this.state.startingPositionY;
    const move = this.props.move;
    const x = this.props.x;
    const popup = this.props.popup;
    const floor = this.props.floor;
    const color = this.props.color;
    const asset = this.props.asset;
    const maxheight = this.props.maxheight;
    const animationclass = ' ' + this.props.animationclass;
    const imgclass = ' ' + this.props.imgclass;
    const opacity = this.props.opacity;
    const clss = (popup, move, x) => (
        popup==="1" && move + 100 > x + 0 ? ' slideIn' : ' slideOut'
    );


    {/*

    const Navbar = ({ visible }) => (
      <div id="navbar" className={visible ? 'slideIn' : 'slideOut'}>
      </div>
    ) 
            */}

    return (
        <div className={popup ? "paradox popup " + clss(popup, move, x) + animationclass : "paradox " + clss(popup, move, x) + animationclass} style={{ left: startingpositionx+'px', 
                top: startingpositiony+'px', 
                bottom: floor,
                position: "absolute", 
                display: "flex",
                backgroundColor: color,
                opacity: opacity,
            }}>
            {/*
            // max-height for image object since it scales!!!
            */}
        { asset ? <img src={"assets/"+asset} className={imgclass} style={{ maxHeight: maxheight }} /> : 
                <span>
                This is just a test...<br/>
                Imagine me to be a single cloud...<br/>
                A big fluffy, puffy cloud...<br/>
                </span>
            }
        </div>
    );
  }
}

Paralax.defaultProps = {
    color: "white",
    opacity: 1,
    popup: 0,
};

export default Paralax;
