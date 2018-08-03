import React, { Component } from 'react';

class Floor extends Component {
  render() {
    const height = this.props.maxheight;
    return (
        <div className="floor" style={{bottom: 0, height: height}} onWheel={this.props.scroll}>
        </div>
    );
  }
}

export default Floor;
