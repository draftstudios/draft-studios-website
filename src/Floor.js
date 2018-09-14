import React, { Component } from 'react';

class Floor extends Component {

    constructor(props) {
      super(props);
      this.state = {
          startingPositionX: this.props.x,
          startingPositionY: this.props.y,
      };
      this.currentPosition = this.props.x;
    }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = (e) => {
      console.log("window scroll y:", window.scrollY);
    const startingpositionx = this.state.startingPositionX - (window.scrollY * this.props.paradoxratio); 
    this.setState({startingPositionX: startingpositionx});
  }

  render() {
    const startingpositionx = this.state.startingPositionX - (this.props.move * this.props.paradoxratio); 
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
            onWheel={this.props.scroll}>
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
