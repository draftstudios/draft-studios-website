import React, { Component } from 'react';

class Fireworks extends Component {

    constructor(props) {
      super(props);
      this.state = {
          startingPositionX: this.props.x,
          startingPositionY: this.props.y,
      };
      this.currentPosition = this.props.x;
    }

  render() {
    const startingpositionx = this.state.startingPositionX - (this.props.move * this.props.ratio); 
    const startingpositiony = this.state.startingPositionY;
    const floor = this.props.floor;
    const width = this.props.width;
    const opacity = this.props.opacity;

    return (
        <div className="pyro" style={{ left: startingpositionx+'px', 
                top: startingpositiony+'px', 
                bottom: floor,
                position: "absolute", 
                display: "flex",
                width: width+'px', 
                opacity: opacity }}>
          <div className="before"></div>
          <div className="after"></div>
        </div>
    );
  }
}

Fireworks.defaultProps = {
    opacity: 1,
};

export default Fireworks;
