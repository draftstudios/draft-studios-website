import React, { Component } from 'react';
import Parallax from './Parallax';

// I isolated CF interactions to this one component. 
// Here I'm going going to show you two ways to potentially grab/get data! WebSockets and a normal Fetch(). 
// ** lots of other ways exist: axios, promise, https://github.com/CharlesMangwa/react-data-fetching perhaps...

class FetchColdFusionAssets extends Component {

  constructor(props) {
    super(props);

    // note state change will trigger a rerender
    this.state = {
        json: [],
    };
  }

  gotUpdateFromSocket = (data) => {
      //console.log(data);
      if (data) {
          const const_data = JSON.parse(data);

          console.log(const_data[0].imgclass);
          if (const_data[0].imgclass === "worldboss") {
            //this.props.startshaking();
          }

          // just in case we get a rogue async state change... trap it 
          !this.isCancelled && this.setState({ json: const_data });
      }
  }

  gotUpdateFromCFC = (data) => {
      if (data) {
          this.setState({ json: data });
      }
  }

  componentDidMount() {
    // ****** first way! web sockets yay! using default port that comes open out-of-box CF 2018
    let socket = new WebSocket("ws://ds1.tavo.io:8581");
      //console.log(socket);

      socket.onopen = () => {
          //console.log( 'opened' );

          socket.send(
            JSON.stringify( {
              appName: "cf-summit-2018", //should match
              ns: "coldfusion.websocket.channels",
              subscribeTo: "cf-summit", //should match what's in /public/services/Application.cfc
              type: "welcome"
            } )
          );

          /* if you want to broadcast a websocket message directly from javascript, use this:
           *
              socket.send(
                JSON.stringify( {
                  ns: "coldfusion.websocket.channels",
                  type: "publish",
                  channel: "cf-summit", // Channel Name
                  appName: "cf-summit-2018", //App Name
                  data: [{id: 1, asset: "Bird-1.png", x: 400, ratio: 1, imgclass: "bird", color: "red"},{id: 2, asset: "Bird-2.png", x: 600, ratio: 1, imgclass: "bird", color: "yellow"}]
                } )
              );

           * for most implementations a fetch like fetchFromWS() works just fine
              fetchFromWS = (params) => fetch("http://127.0.0.1:8080/services/ds.cfc?method=broadcast&params="+params).then(function(response) { 
                return true;
              })
          */
    };

    socket.onclose = () => {
        //console.log( 'onclose' );
    };

    socket.onerror = () => {
        //console.log( 'onerror' );
    };

    socket.onmessage = ( event ) => {
      this.gotUpdateFromSocket(JSON.parse(event.data).data);
    };
  }

  fetchFromWS = (params) => fetch("http://ds1.tavo.io:8080/services/ds.cfc?method=broadcast&params="+params).then(function(response) { 
    return true;
  })

  fetchWorldBoss = (params) => {
      this.props.startshaking(); // this is coming from props (App.js -> startWorldBossShake) 
      fetch("http://ds1.tavo.io:8080/services/ds.cfc?method=broadcastWorldBoss&params="+params).then(function(response) { 
      return true;
    }).then((rawdata) => {
        // don't really have to do anything... the websocket should update content
    })
  }

  // ****** second way! straight cfcs! be mindful of CORS, also make sure component cache isn't on in CF admin if you're actively working 
  fetchFromCFC = (params) => fetch("http://ds1.tavo.io:8080/services/ds.cfc?method=fetch&params="+params).then(function(response) { 
    return response.json();
  }).then((rawdata) => {
    this.gotUpdateFromCFC(rawdata);
  })

  takeMeToDraftStudios = () => {
      window.location = "http://draftstudios.com";
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  render() {
    const json = this.state.json; 

    return (
        <div>
            {json.map(obj => 
                <Parallax key={obj.key} move={this.props.move} x={obj.x} floor={this.props.floor} color={obj.color} ratio={obj.ratio} asset={obj.asset} imgclass={obj.imgclass}/>
            )}

            <div style={{position: "absolute"}}>
                <span className='video-game-button noselect' onClick={this.fetchFromCFC}>A</span>
                <span className='video-game-button noselect' onClick={this.fetchFromWS}>B</span>  
                <span className='start-btn noselect' onClick={this.fetchWorldBoss}>WORLD BOSS</span>
                <span className='start-btn noselect' onClick={this.takeMeToDraftStudios}>MAIN MENU</span> 
            </div>
        </div>
    );
  }
}

export default FetchColdFusionAssets;
