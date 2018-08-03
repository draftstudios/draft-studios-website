import React, { Component } from 'react';

class Canvas extends Component {
  render() {
    return (
        <div className="canvas" onWheel={this.props.scroll}>
            {this.props.children}
        </div>
    );
  }
}

export default Canvas;
