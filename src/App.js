// just playing around... written for Adobe CF Summit 2018 @ Las Vegas, NV
// best considered a test bed to convey some high level ideas
// WHERE CAN WE GO FROM HERE? 
//  render optimizations
//  better variable naming
//  dynamic viewport sizing -> kinda like how charting has dynamic axis
//  add in real multi-player control (right now CF is emulating the user through websockets)
//  animations are only dependent on X-axis movement... maybe add jumping, flying, diving mechanics, etc...
//  maybe bring in a motion/animation library... react-motion... get out of the box spring and motion mechanics... mine are way simple
//  maybe bring in react-draggable if we want to implement some drag and drop ability into the "game"... currently the only action we're monitoring and using is scroll
//  parallax x prop should probably be true starting X position... right now parallax factor is applied even when object is not on screen 
//  ~ explain this: parallax ratio probably should not go into effect until object linearly crosses screen
//
// TOPICS NOT COVERED THAT ARE IMPORTANT IN YOUR LEARNING?
//  props vs state
//  controlled/uncontrolled components (does the component need to be state aware)
//  higher order components (wrappers)
//  routing
//  server rendering
//  data flow and state management: Redux/Flux/RxJS/vanilla/axios/fetch... too many options

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './Canvas';
import Person from './Person';
import Floor from './Floor';
import Parallax from './Parallax';
import Fireworks from './Fireworks';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        floor: "20vh",
        street: "20vh",
        deltaMode: 0,
        deltaY: 0,
        currentPosition: 0,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeys);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeys);
  }

  handleWheel = (e) => {
      const currentposition = this.state.currentPosition;
      //console.log(e.deltaMode, e.deltaX, e.deltaY, e.deltaZ)
      this.setState({
          deltaMode: e.deltaMode,
          deltaY: e.deltaY,
          currentPosition: currentposition+e.deltaY > 0 ? currentposition + e.deltaY : 0, 
      });
  }

  handleKeys = (e) => {
      const currentposition = this.state.currentPosition;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        this.setState({
            deltaMode: 0,
            deltaY: 100,
            currentPosition: currentposition+100 > 0 ? currentposition + 100 : 0, 
        });
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        this.setState({
            deltaMode: 0,
            deltaY: -100,
            currentPosition: currentposition-100 > 0 ? currentposition - 100 : 0, 
        });
      }
  }

  render() {
    const scrollChange = this.state.deltaY;
    const pos = this.state.currentPosition;

    return (
        <Canvas tabIndex="1" scroll={this.handleWheel} move={scrollChange} maxscroll={10000}>

            {/* vegas!!! */}
            <Parallax move={pos} x="0" floor={this.state.floor} paradoxratio="0.9" opacity="0.5" asset="Vegas-Background-Buildings.png" color="transparent"/>
            <Parallax move={pos} x="0" floor={this.state.floor} paradoxratio="1.2" opacity="1" asset="Vegas-Back-Trees.png" color="transparent"/>


                {/* set this width to the vegas scene width */}
            <Fireworks move={pos} x="0" y="0" width="1500" paradoxratio="1"/>

            <Parallax move={pos} x="200" animationclass="vegas-sign-glow-slides" floor={this.state.floor} paradoxratio="1" opacity="1" color="transparent"/>
            <Parallax move={pos} x="1000" animationclass="vegas-luxor-slides" floor={this.state.floor} paradoxratio="1" opacity="1" color="transparent"/>
            <Parallax move={pos} x="2200" animationclass="vegas-hard-rock-slides" floor={this.state.floor} paradoxratio="1" opacity="1" color="transparent"/>
            <Parallax move={pos} x="3600" animationclass="vegas-statue-liberty-slides" floor={this.state.floor} paradoxratio="1" opacity="1" color="transparent"/>
            <Parallax move={pos} x="4600" animationclass="vegas-eiffel-slides" floor={this.state.floor} paradoxratio="1" opacity="1" color="transparent"/>
            <Parallax move={pos} x="5300" animationclass="vegas-bellagio-slides" floor={this.state.floor} paradoxratio="1" opacity="1" color="transparent"/>

            <Parallax move={pos} x="7300" animationclass="vegas-stratosphere-slides" floor={this.state.floor} paradoxratio="1" opacity="1" color="transparent"/>
            

            <Parallax move={pos} x="25" y="25" paradoxratio="0.5" opacity="0.1" asset="Cloud-Left-Large.png" color="transparent"/>
            <Parallax move={pos} x="400" y="200" paradoxratio="2" opacity="0.2" asset="Cloud-Left-Small.png" color="transparent"/>
            <Parallax move={pos} x="750" y="100" paradoxratio="1.25" opacity="0.1" asset="Cloud-Right-Large.png" color="transparent"/>
            <Parallax move={pos} x="1450" y="50" paradoxratio="0.75" opacity="0.2" asset="Cloud-Right-Med.png" color="transparent"/>
            <Parallax move={pos} x="1700" y="125" paradoxratio="2.25" opacity="0.1" asset="Cloud-Right-Small.png" color="transparent"/>
            <Parallax move={pos} x="2750" y="10" paradoxratio="0.25" opacity="0.2" asset="Clouds-Left-Med.png" color="transparent"/>
            <Parallax move={pos} x="3750" y="80" paradoxratio="1.25" opacity="0.1" asset="Cloud-Left-Large.png" color="transparent"/>

            <Parallax move={pos} x="100" floor={this.state.street} color="transparent" paradoxratio="1.5" asset="Bird-1.png" imgclass="bird"/>
            <Parallax move={pos} x="1100" floor={this.state.street} color="transparent" paradoxratio="1.5" asset="Bird-2.png" imgclass="bird"/>

            <Parallax move={pos} x="0" floor={this.state.floor} paradoxratio="1.1" opacity="1" asset="Vegas-Front-Trees.png" color="transparent"/>


            {/* <Paralax scroll={this.handleWheel} move={scrollChange} x="750" y="100" paradoxratio="1.25"/> */} 
            {/* below "floor" should really be set to total width of ground covered by all assets in the Parallax category */}

            <Parallax x="0" floor={this.state.street} maxheight="15vh" color="transparent" paradoxratio="1.5" asset="Train.png" imgclass="train"/>
            <Parallax x="0" floor={this.state.street} maxheight="15vh" color="transparent" paradoxratio="1.5" asset="Taxi-Camry.png" imgclass="camry"/>
            <Parallax x="0" floor={this.state.street} maxheight="15vh" color="transparent" paradoxratio="1.5" asset="Taxi-Prius.png" imgclass="prius"/>

            {/* if i leave move={pos} then React will keep re-rendering since the props is changing as I scroll 
                <Floor x="0" nowrap="1" maxheight={this.state.street} paradoxratio="1" width="100000"/>              
            */} 

            <Floor move={pos} x="0" maxheight={this.state.floor} paradoxratio="1" width="100000"/>
            <Person pos={pos} floor={this.state.floor} deltamode={this.state.deltaMode} deltay={this.state.deltaY} />

            <Parallax move={pos} x="8300" animationclass="vegas-teleporter-slides" floor={this.state.floor} paradoxratio="1" opacity="1" color="transparent"/>

        </Canvas>
    );
  }
}

export default App;
//
//
//            <Parallax move={pos} x="25000" floor={this.state.floor} paradoxratio="0.75" opacity="0.5" asset="Background-Buildings.png" color="transparent"/>
//                {/* <Paralax move={pos} x="0" floor={this.state.floor} paradoxratio="0.85" opacity="0.5" asset="Background-Trees.png" color="transparent"/> */}
//            <Parallax move={pos} x="25025" y="25" paradoxratio="0.5" asset="Cloud-Left-Large.png" color="transparent"/>
//            <Parallax move={pos} x="25400" y="200" paradoxratio="2" asset="Cloud-Left-Small.png" color="transparent"/>
//            <Parallax move={pos} x="25750" y="100" paradoxratio="1.25" asset="Cloud-Right-Large.png" color="transparent"/>
//            <Parallax move={pos} x="26450" y="50" paradoxratio="0.75" asset="Cloud-Right-Med.png" color="transparent"/>
//            <Parallax move={pos} x="26700" y="125" paradoxratio="2.25" asset="Cloud-Right-Small.png" color="transparent"/>
//            <Parallax move={pos} x="27750" y="10" paradoxratio="0.25" asset="Clouds-Left-Med.png" color="transparent"/>
//            <Parallax move={pos} x="28750" y="80" paradoxratio="1.25" asset="Cloud-Left-Large.png" color="transparent"/>
//
//
//            <Parallax move={pos} x="25100" floor={this.state.floor} color="transparent" opacity="0.9" paradoxratio="1" asset="Zaykim.png"/>
//            <Parallax move={pos} x={25700} popup="1" floor={this.state.floor} color="transparent" paradoxratio="1" asset="TD-Garden.png"/>
//            <Parallax move={pos} x="26300" floor={this.state.floor} color="transparent" paradoxratio="1" asset="Prudential.png"/>
//
//            <Parallax move={pos} x="27300" floor={this.state.floor} color="transparent" paradoxratio="1" asset="Billboard.png"/>
//            <Parallax move={pos} x="27325" y="400" color="transparent" paradoxratio="1" asset="Billboard-Lights.png"/>
//
//            <Parallax move={pos} x="28000" floor={this.state.floor} color="transparent" paradoxratio="1" asset="Citgo.png"/>
//            <Parallax move={pos} x="28500" floor={this.state.floor} color="transparent" paradoxratio="1" asset="Chinatown.png"/>
//
//            <Parallax move={pos} x="29000" floor={this.state.floor} color="transparent" paradoxratio="1" asset="City-Hall.png"/>
//            <Parallax move={pos} x="29500" floor={this.state.floor} color="transparent" paradoxratio="1" asset="Commons.png"/>
//
//            <Parallax move={pos} x="25100" floor={this.state.floor} color="transparent" paradoxratio="0.75" asset="Bird-1.png"/>
//            <Parallax move={pos} x="25300" floor={this.state.floor} color="transparent" paradoxratio="1.5" asset="Bird-2.png"/>

