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
//  sound effects: fireworks, walking, cars/taxis/train...
//  have cf control other avatars that are a class between Person and Parallax
//  move WebSocket initialization from FetchColdFusionAssets.js to App.js - this buys us more flexibility, and WebSocket can change things on that level: Canvas (background, etc).
//  move fetch() also to App.js for same reason. 
//
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
import Notification from './Notification';
import FetchColdFusionAssets from './FetchColdFusionAssets';

class App extends Component {

  constructor(props) {
    super(props);
      //https://stackoverflow.com/questions/43817118/how-to-get-the-width-of-a-react-element
    this.myCanvas = React.createRef();
    this.state = {
        floor: "20vh",
        street: "20vh",
        deltaMode: 0,
        deltaY: 0,
        currentPosition: 0,
        freeze: 0,
        mode: "vegas",
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeys);
      //window.addEventListener('scroll', this.handleWheel, true);
    window.addEventListener('resize', this.resize);

    const viewportWidth = this.myCanvas.current.offsetWidth;
      //console.log("vw:", viewportWidth);

      this.setState({
        vw: viewportWidth
      });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeys);
      //window.removeEventListener('scroll', this.handleWheel);
    window.removeEventListener('resize', this.resize);
  }

  componentDidUpdate(prevState) {
    if (this.state.freeze !== prevState.freeze && this.state.freeze === 1) {
        setTimeout(this.switchModes, 3000);
    }
  }

  resize = () => {
    this.forceUpdate();
    const viewportWidth = this.myCanvas.current.offsetWidth;

    this.setState({
      vw: viewportWidth
    });
  }
  
  switchModes = () => {          
    const currentMode = this.state.mode;
    this.setState({
        mode: currentMode === "vegas" ? "boston" : "vegas",
        freeze: 0,
        currentPosition: 0,
        deltaMode: 0,
        deltaY: 0,
    });
  }

  handleWheel = (e, maxscroll) => {
      const currentposition = this.state.currentPosition;
      //console.log(e.deltaMode, e.deltaX, e.deltaY, e.deltaZ)

      this.setState({
          deltaMode: e.deltaMode,
          deltaY: e.deltaY,
          currentPosition: currentposition+e.deltaY > 0 ? (currentposition+e.deltaY > maxscroll ? maxscroll : currentposition + e.deltaY) : 0, 
          freeze: currentposition+e.deltaY > maxscroll ? 1 : 0,
      });
  }

  handleKeys = (e) => {
      const currentposition = this.state.currentPosition;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        this.setState({
            deltaMode: 0,
            deltaY: 100 + Math.random(),
            currentPosition: currentposition+100 > 0 ? currentposition + 100 : 0, 
        });
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        this.setState({
            deltaMode: 0,
            deltaY: -100 + Math.random(),
            currentPosition: currentposition-100 > 0 ? currentposition - 100 : 0, 
        });
      }
  }

  render() {
    const scrollChange = this.state.deltaY;
    const vegasMaxScroll = 8300 - this.state.vw / 2 + 150; //basically total asset width minus half the viewport and adjust by person width
    const bostonMaxScroll = 7500 - this.state.vw / 2 + 150;
    const pos = this.state.currentPosition;
    const freeze = this.state.freeze;
    const mode = this.state.mode;

    return (
        //https://stackoverflow.com/questions/43817118/how-to-get-the-width-of-a-react-element
        <div ref={this.myCanvas}>

        {
         
        (mode === "vegas" && 
        <Canvas mode={mode} tabIndex="1" key="1" scroll={(e) => freeze ? null : this.handleWheel(e, vegasMaxScroll) }>
        {/* this is how i'll handle max scroll */}

            {/* vegas!!! */}
            {/*
            <Parallax move={pos} x="0" floor={this.state.floor} paradoxratio="0.7" opacity="0.3" asset="Vegas-Sand-Dunes.png" color="transparent"/>
            */}
            <Parallax move={pos} x="0" floor={this.state.floor} paradoxratio="0.9" opacity="0.5" asset="Vegas-Background-Buildings.png" color="transparent"/>
            <Parallax move={pos} x="0" floor={this.state.floor} paradoxratio="1.2" opacity="1" asset="Vegas-Back-Trees.png" color="transparent"/>

                {/* set this width to the vegas scene width */}
            <Fireworks move={pos} x="0" y="0" width="1500" paradoxratio="1"/>

            <Parallax move={pos} x="200" animationclass="vegas-sign-glow-slides" floor={this.state.floor} paradoxratio="1" opacity="1" color="transparent" asset="Spacer.png"/>
            <Parallax move={pos} x="1000" animationclass="vegas-luxor-slides" floor={this.state.floor} paradoxratio="1" opacity="1" color="transparent" asset="Spacer.png"/>
            <Parallax move={pos} x="2200" animationclass="vegas-hard-rock-slides" floor={this.state.floor} paradoxratio="1" opacity="1" color="transparent" asset="Spacer.png"/>
            <Parallax move={pos} x="3600" animationclass="vegas-statue-liberty-slides" floor={this.state.floor} paradoxratio="1" opacity="1" color="transparent" asset="Spacer.png"/>
            <Parallax move={pos} x="4600" animationclass="vegas-eiffel-slides" floor={this.state.floor} paradoxratio="1" opacity="1" color="transparent" asset="Spacer.png"/>
            <Parallax move={pos} x="5300" animationclass="vegas-bellagio-slides" floor={this.state.floor} paradoxratio="1" opacity="1" color="transparent" asset="Spacer.png"/>

            <Parallax move={pos} x="7300" animationclass="vegas-stratosphere-slides" floor={this.state.floor} paradoxratio="1" opacity="1" color="transparent" asset="Spacer.png"/>

            <Parallax move={pos} x="50" y="25" paradoxratio="0.5" opacity="0.3" asset="Cloud-Left-Large.png" color="transparent"/>
            <Parallax move={pos} x="440" y="200" paradoxratio="2" opacity="0.4" asset="Cloud-Left-Small.png" color="transparent"/>
            <Parallax move={pos} x="770" y="100" paradoxratio="1.25" opacity="0.4" asset="Cloud-Right-Large.png" color="transparent"/>
            <Parallax move={pos} x="1550" y="50" paradoxratio="0.75" opacity="0.5" asset="Cloud-Right-Med.png" color="transparent"/>
            <Parallax move={pos} x="1750" y="125" paradoxratio="2.25" opacity="0.2" asset="Cloud-Right-Small.png" color="transparent"/>
            <Parallax move={pos} x="2750" y="10" paradoxratio="0.25" opacity="0.6" asset="Clouds-Left-Med.png" color="transparent"/>
            <Parallax move={pos} x="3750" y="80" paradoxratio="1.25" opacity="0.2" asset="Cloud-Left-Large.png" color="transparent"/>

            <Parallax move={pos} x="100" floor={this.state.floor} color="transparent" paradoxratio="0.75" asset="Bird-1.png" imgclass="bird"/>
            <Parallax move={pos} x="300" floor={this.state.floor} color="transparent" paradoxratio="1.5" asset="Bird-2.png" imgclass="bird"/>
            <Parallax move={pos} x="800" floor={this.state.floor} color="transparent" paradoxratio="0.75" asset="Bird-1.png" imgclass="bird"/>
            <Parallax move={pos} x="1000" floor={this.state.floor} color="transparent" paradoxratio="1.5" asset="Bird-2.png" imgclass="bird"/>

            <Parallax move={pos} x="0" floor={this.state.floor} paradoxratio="1.1" opacity="1" asset="Vegas-Front-Trees.png" color="transparent"/>

            <FetchColdFusionAssets move={pos} floor={this.state.street}/>

            {/* <Paralax scroll={this.handleWheel} move={scrollChange} x="750" y="100" paradoxratio="1.25"/> */} 
            {/* below "floor" should really be set to total width of ground covered by all assets in the Parallax category */}

            <Parallax x="0" floor={this.state.street} maxheight="15vh" color="transparent" paradoxratio="1.5" asset="Taxi-Prius.png" imgclass="prius"/>

            {/* if i leave move={pos} then React will keep re-rendering since the props is changing as I scroll 
                <Floor x="0" nowrap="1" maxheight={this.state.street} paradoxratio="1" width="100000"/>              
            */} 

            <Floor move={pos} x="0" maxheight={this.state.floor} paradoxratio="1" width="20000"/>

            <Person key="1" pos={pos} floor={this.state.floor} deltamode={this.state.deltaMode} deltay={scrollChange} maxscroll={vegasMaxScroll} />

            <Parallax move={pos} x="8300" staticclass="vegas-teleporter" animationclass="vegas-teleporter-slides" animateat={vegasMaxScroll} floor={this.state.floor} paradoxratio="1" opacity="1" color="transparent" freeze="true" asset="Spacer.png"/>

            <Notification text="Welcome to our online demo! Scroll your mouse or use the arrow keys to explore. - Draft Studios Team"/>

        </Canvas>
        ) ||
        (mode === "boston" && 
        <Canvas mode={mode} tabIndex="2" key="2" scroll={(e) => freeze ? null : this.handleWheel(e, bostonMaxScroll) }>

            {/*
            <Parallax move={pos} x="0" floor={this.state.floor} paradoxratio="0.75" opacity="0.5" asset="Background-Buildings.png" color="transparent"/>
            */}
            <Parallax move={pos} x="0" floor={this.state.floor} paradoxratio="0.85" opacity="1" asset="Background-Trees.png" color="transparent"/> 

            <Parallax move={pos} x="100" floor={this.state.floor} color="transparent" opacity="1" paradoxratio="0.8" asset="Zaykim.png"/>
            <Parallax move={pos} vw={this.state.vw} x={800} popup="1" floor={this.state.floor} color="transparent" paradoxratio="1" asset="TD-Garden.png"/>
            <Parallax move={pos} vw={this.state.vw} x={1900} popup="1" floor={this.state.floor} color="transparent" paradoxratio="1" asset="Prudential.png"/>

            <Parallax move={pos} vw={this.state.vw} x={2300} popup="1" floor={this.state.floor} color="transparent" paradoxratio="1" asset="Billboard.png"/>
            <Parallax move={pos} vw={this.state.vw} x={2325} color="transparent" paradoxratio="1" asset="Billboard-Lights.png"/>

            <Parallax move={pos} vw={this.state.vw} x={3000} popup="1" floor={this.state.floor} color="transparent" paradoxratio="1" asset="Citgo.png"/>
            <Parallax move={pos} vw={this.state.vw} x={3500} popup="1" floor={this.state.floor} color="transparent" paradoxratio="1" asset="Chinatown.png"/>

            <Parallax move={pos} vw={this.state.vw} x={4500} popup="1" floor={this.state.floor} color="transparent" paradoxratio="1" asset="City-Hall.png"/>
            <Parallax move={pos} x={5500} floor={this.state.floor} color="transparent" paradoxratio="1" asset="Commons.png"/>
            <Parallax move={pos} x={5940} floor={this.state.floor} color="transparent" paradoxratio="1" asset="Washington-Statue.png"/>

            <Parallax move={pos} x="25" y="25" paradoxratio="0.5" asset="Cloud-Left-Large.png" color="transparent"/>
            <Parallax move={pos} x="400" y="200" paradoxratio="2" asset="Cloud-Left-Small.png" color="transparent"/>
            <Parallax move={pos} x="750" y="100" paradoxratio="1.25" asset="Cloud-Right-Large.png" color="transparent"/>
            <Parallax move={pos} x="1450" y="50" paradoxratio="0.75" asset="Cloud-Right-Med.png" color="transparent"/>
            <Parallax move={pos} x="1700" y="125" paradoxratio="2.25" asset="Cloud-Right-Small.png" color="transparent"/>
            <Parallax move={pos} x="2750" y="10" paradoxratio="0.25" asset="Clouds-Left-Med.png" color="transparent"/>
            <Parallax move={pos} x="3750" y="80" paradoxratio="1.25" asset="Cloud-Left-Large.png" color="transparent"/>

            <Parallax x="0" floor={this.state.street} maxheight="15vh" color="transparent" paradoxratio="1.5" asset="Train.png" imgclass="train"/>
            <Parallax x="0" floor={this.state.street} maxheight="15vh" color="transparent" paradoxratio="1.5" asset="Taxi-Camry.png" imgclass="camry"/>

            <Floor move={pos} x="0" maxheight={this.state.floor} paradoxratio="1" width="20000"/>
            <Person key="2" imgclass="person-slides-jimmy" pos={pos} floor={this.state.floor} deltamode={this.state.deltaMode} deltay={scrollChange} maxscroll={bostonMaxScroll} />
            
            <Parallax move={pos} x="100" floor={this.state.floor} color="transparent" paradoxratio="0.75" asset="Bird-1.png" imgclass="bird"/>
            <Parallax move={pos} x="300" floor={this.state.floor} color="transparent" paradoxratio="1.5" asset="Bird-2.png" imgclass="bird"/>
            <Parallax move={pos} x="800" floor={this.state.floor} color="transparent" paradoxratio="0.75" asset="Bird-1.png" imgclass="bird"/>
            <Parallax move={pos} x="1000" floor={this.state.floor} color="transparent" paradoxratio="1.5" asset="Bird-2.png" imgclass="bird"/>

            {/*
            <Parallax move={pos} x="5100" floor={this.state.floor} color="transparent" paradoxratio="0.75" asset="Bird-1.png"/>
            <Parallax move={pos} x="5300" floor={this.state.floor} color="transparent" paradoxratio="1.5" asset="Bird-2.png"/>
            */}

            <Parallax move={pos} x="7500" staticclass="vegas-teleporter" animationclass="vegas-teleporter-slides" animateat={bostonMaxScroll} floor={this.state.floor} paradoxratio="1" opacity="1" color="transparent" freeze="true" asset="Spacer.png"/>

            <Notification text="Hey, you made it to the secret stage! Can you guess where we're from?"/>

        </Canvas>
        )
        }
        </div>
    );
  }
}

export default App;
