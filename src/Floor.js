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
    const style = (this.props.dc === "true") ? "floor-dc" : "floor";

    // if current this.props.move + center logic is within startingposition and width, callback upd(maxheight) to update state.floor
    return (
        <div className={style} style={{
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
              {this.props.move}
            </div>
                :
                null }

        </div>
    );
  }
}

export default Floor;
