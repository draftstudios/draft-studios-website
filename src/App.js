import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './Canvas';
import Person from './Person';
import Floor from './Floor';
import Paradox from './Paradox';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        floor: "15vh",
        deltaMode: 0,
        deltaY: 0,
        currentPosition: 0,
    };
  }

  handleWheel = (e) => {
      const currentposition = this.state.currentPosition;
      console.log(e.deltaMode, e.deltaX, e.deltaY, e.deltaZ)
      this.setState({
          deltaMode: e.deltaMode,
          deltaY: e.deltaY,
          currentPosition: currentposition+e.deltaY > 0 ? currentposition + e.deltaY : 0, 
      });
  }

  render() {
    const scrollChange = this.state.deltaY;
    const pos = this.state.currentPosition;

    return (
        <Canvas scroll={this.handleWheel} move={scrollChange}>
            <Paradox move={pos} x="25" y="25" paradoxratio="0.5"/>
            <Paradox move={pos} x="400" y="200" paradoxratio="2"/>
            <Paradox move={pos} x="750" y="100" paradoxratio="1.25"/>
            <Paradox move={pos} x="1450" y="50" paradoxratio="0.75"/>
            <Paradox move={pos} x="1700" y="125" paradoxratio="2.25"/>
            <Paradox move={pos} x="2750" y="10" paradoxratio="0.25"/>
            <Paradox move={pos} x="3750" y="80" paradoxratio="1.25"/>
                {/*
                <Paradox scroll={this.handleWheel} move={scrollChange} x="750" y="100" paradoxratio="1.25"/>
                */} 
            <Floor scroll={this.handleWheel} maxheight={this.state.floor}/>
            <Person floor={this.state.floor} deltamode={this.state.deltaMode} deltay={this.state.deltaY} />
        </Canvas>
    );
  }
}

export default App;
