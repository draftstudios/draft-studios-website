import React, { Component } from 'react';

class Notification extends Component {

  render() {
    return (
        <div className="notification">
            {this.props.text}
        </div>
    );
  }
}

export default Notification;
