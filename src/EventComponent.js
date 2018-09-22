import React from 'react';

// http://www.hartzis.me/test-touch-events-react/
// playing with this as it looks like a better way to handle swipes... 
// notice there is a bug if you start swipe on Person object it constrains the swipe to that div dimensions
// will fix this later.

export default class EventComponent extends React.Component {

  constructor(props) {
    super(props);

    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);

    this.state = { swiped: false };
    this._swipe = {};
    this.minDistance = 50;
  }

  _onTouchStart(e) {
    const touch = e.touches[0];
    this._swipe = { x: touch.clientX };
    this.setState({ swiped: false });
  }

  _onTouchMove(e) {
    if (e.changedTouches && e.changedTouches.length) {
      const touch = e.changedTouches[0];
      this._swipe.swiping = true;
    }
  }

  _onTouchEnd(e) {
    const touch = e.changedTouches[0];
    const absX = Math.abs(touch.clientX - this._swipe.x);
    if (this._swipe.swiping && absX > this.minDistance ) {
      this.props.onSwiped && this.props.onSwiped();
      this.setState({ swiped: true });
    }
    this._swipe = {};
  }

  render() {
    return (
      <div
        onTouchStart={this._onTouchStart}
        onTouchMove={this._onTouchMove}
        onTouchEnd={this._onTouchEnd}>
        {/*
            {`Component-${this.state.swiped ? 'swiped' : ''}`}
        */}
        {this.props.children}
      </div>
    );
  }

}
