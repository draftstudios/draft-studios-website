import React, { Component } from 'react';

class Canvas extends Component {

  render() {
    const shouldChangeBackground = 0 > 1 ? "canvas night-to-day" : "canvas day-to-night";
    const maxscroll = this.props.maxscroll; 
    return (
        <div className={shouldChangeBackground} onWheel={this.props.scroll}>
            {this.props.children}
        </div>
    );
  }
}

export default Canvas;
