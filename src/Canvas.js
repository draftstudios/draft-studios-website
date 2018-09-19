import React, { Component } from 'react';

class Canvas extends Component {

  render() {
    const shouldChangeBackground = this.props.mode==="vegas" ? "canvas day-to-night" : "canvas night-to-day";
    const maxscroll = this.props.maxscroll; 
    return (
        <div className={shouldChangeBackground} onWheel={this.props.scroll}>
            {this.props.children}
        </div>
    );
  }
}

export default Canvas;
