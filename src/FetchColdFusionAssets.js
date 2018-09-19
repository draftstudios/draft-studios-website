import React, { Component } from 'react';
import Parallax from './Parallax';
import Notification from './Notification';

// I isolated CF interactions to this one component. 
// Here I'm going going to show you two ways to potentially grab/get data! WebSockets and a normal Fetch(). 
//
class FetchColdFusionAssets extends Component {

  constructor(props) {
    super(props);
    this.state = {
        json: [],
        color: 'transparent',
    };
  }

  gotUpdateFromSocket = (data) => {
      console.log(data);
      if (data) {
          this.setState({ json: JSON.parse(data) });
      }
  }

  gotUpdateFromCFC = (data) => {
      if (data) {
          this.setState({ json: data });
      }
  }

  changeBackground = () => {
      this.setState({ color: 'pink' });
  }

  componentDidMount() {
    // ****** first way! web sockets yay!
    let socket = new WebSocket("ws://127.0.0.1:8581");
      console.log(socket);

      socket.onopen = () => {
      console.log( 'opened' );

      socket.send(
        JSON.stringify( {
          appName: "cf-summit-2018", //App Name
          ns: "coldfusion.websocket.channels",
          subscribeTo: "cf-summit", //Channel subscribing to
          type: "welcome"
        } )
      );

      /*
      socket.send(
        JSON.stringify( {
          ns: "coldfusion.websocket.channels",
          type: "publish",
          channel: "cf-summit", // Channel Name
          appName: "cf-summit-2018", //App Name
          data: [{id: 1, asset: "Bird-1.png", x: 400, paradoxratio: 1, imgclass: "bird", color: "red"},{id: 2, asset: "Bird-2.png", x: 600, paradoxratio: 1, imgclass: "bird", color: "yellow"}]
        } )
      );
      */
    
    };

    socket.onclose = () => {
      console.log( 'onclose' );
    };

    socket.onerror = () => {
      console.log( 'onerror' );
    };

    socket.onmessage = ( event ) => {
      this.gotUpdateFromSocket(JSON.parse(event.data).data);
    };

  }

    // ****** second way! straight cfcs! be mindful of CORS 
    fetchFromCFC = (params) => fetch("http://127.0.0.1:54520/services/ds.cfc?method=fetch&params="+params).then(function(response) { 
      return response.json();
    }).then((rawdata) => {
      this.gotUpdateFromCFC(rawdata);
    })

    fetchFromWS = (params) => fetch("http://127.0.0.1:54520/services/broadcast.cfm?params="+params).then(function(response) { 
      return response.json();
    }).then((rawdata) => {
        // don't really have to do anything... the websocket should update content
    })

  render() {
    const json = this.state.json; 
    const color = this.state.color;

    return (
        <div>

            {json.map(obj => 
                <Parallax key={obj.x} move={this.props.move} x={obj.x} floor={this.props.floor} color={obj.color} paradoxratio={obj.paradoxratio} asset={obj.asset} imgclass={obj.imgclass}/>
            )}

            <button onClick={this.fetchFromCFC}>Change Everyone's Duck-Boats (CFC)</button>
            <button onClick={this.fetchFromWS}>Change Everyone's Duck-Boats (WS)</button>
        </div>
    );
  }
}

export default FetchColdFusionAssets;
