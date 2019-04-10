import React, { Component } from 'react';

class Canvas extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        deltaX: 0,
        startX: 0,
        endX: 0,
      };
    }
 
  handleTouchStart = (e) => {
    console.log('start', e.changedTouches[0].pageX, e.target); 
      this.setState({ startX: e.changedTouches[0].pageX }); 
  }

  handleTouchMove = (e) => {
    console.log('move', e.changedTouches[0].pageX, e.target); 
      const delta = e.changedTouches[0].pageX - this.state.startX;

      // pass along an obj that looks like wheel event
      const obj = {deltaY: delta / 2}

      // call the scroll event handler
      this.props.scroll(obj);
      this.setState({ startX: e.changedTouches[0].pageX }); 
  }

  handleTouchEnd = () => {
    console.log('end');
      //const delta = this.state.endY - this.state.startY;
      this.setState({ deltaX: 0, startX: 0, endX: 0 });

      //const obj = {deltaY: delta}
      //this.props.scroll(obj);
  }

  render() {
    const shouldChangeBackground = this.props.mode==="dc" ? "canvas dc" + this.props.className : this.props.mode==="vegas" ? "canvas day-to-night" + this.props.className : "canvas night-to-day" + this.props.className;
    return (
        <div className={shouldChangeBackground} onWheel={this.props.scroll} 
            onTouchStart={touchStartEvent => this.handleTouchStart(touchStartEvent)}
            onTouchMove={touchMoveEvent => this.handleTouchMove(touchMoveEvent)}
            onTouchEnd={this.handleTouchEnd}
            >
            {this.props.children}
        </div>
    );
  }
}

export default Canvas;
