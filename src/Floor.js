import React, { Component } from 'react';

class Floor extends Component {

    constructor(props) {
      super(props);
      this.state = {
          startingPositionX: this.props.x,
          startingPositionY: this.props.y,
      };
    }

  render() {
    const startingpositionx = this.state.startingPositionX - (this.props.move * this.props.ratio); 
    const startingpositiony = this.state.startingPositionY;
    const height = this.props.maxheight;
    const width = this.props.width;
    const nowrap = this.props.nowrap;

    return (
        <div className="floor" style={{
                bottom: 0, 
                width: width+'px', 
                height: height, 
                left: startingpositionx+'px', 
                top: startingpositiony+'px', 
                position: "absolute" 
            }} 
            >
            { !nowrap ? 
            <div className="wrap" style={{bottom: 0, width: width+'px'}} >
            </div>
                :
                null }

        </div>
    );
  }
}

export default Floor;
