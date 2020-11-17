import React, { Component } from 'react';

class Parallax extends Component {

    constructor(props) {
      super(props);
      this.state = {
          startingPositionX: this.props.x,
          startingPositionY: this.props.y,
      };
      this.currentPosition = this.props.x;
    }

  render() {
      //if (this.props.popup === "1") console.log(this.props.move, this.props.x, this.props.vw);
        const startingpositionx = this.state.startingPositionX - (this.props.move * this.props.ratio); 
        const startingpositiony = this.state.startingPositionY;
        const move = this.props.move;
        const x = this.props.x;
        const popup = this.props.popup;
        const floor = this.props.floor;
        const color = this.props.color;
        const asset = this.props.asset;
        const maxheight = this.props.maxheight;
        const animationclass = 
          move === this.props.animateat ? 
              ' ' + this.props.animationclass : 
              !this.props.animateat 
              ? 
              ' ' + this.props.animationclass : 
              ' ' + this.props.staticclass;
        const imgclass = ' ' + this.props.imgclass;
        const opacity = this.props.opacity;
        const clss = (popup, move, x) => (
            popup==="1" && 
            move + (this.props.vw / 2) // current position relative to travel line
            > x - (this.props.vw / 2.25) 
            ? ' slideIn' : ' slideOut'
        );

    return (
        <div className={popup ? "parallax popup " + clss(popup, move, x) + animationclass : "parallax" + clss(popup, move, x) + animationclass} 
                style={{ left: startingpositionx+'px', 
                    top: startingpositiony+'px', 
                    bottom: floor,
                    position: "absolute", 
                    display: "flex",
                    backgroundColor: color,
                    opacity: opacity,
                }}>

            <span style={{ float: "left", width: '100px' }}>{ Math.abs(this.currentPosition + 200 - ( this.props.move + (this.props.vw / 2))) < 200 
                ? 'BOOM' : 
                    !isNaN((this.props.move + (this.props.vw / 2))) && (this.currentPosition + ' - ' + (this.props.move + (this.props.vw / 2)))}</span>

            {/*
                // max-height for image object since it scales!!!
                // asset check is failing for animated classes since it's technically a background with no image... make transparent image asset
            */}
        { asset ? <img src={"assets/"+asset} alt={asset} className={imgclass} style={{ maxHeight: maxheight }} /> : 
                <span>
                This is just a test...<br/>
                Imagine me to be a single cloud...<br/>
                A big fluffy, puffy cloud...<br/>
                </span>
            }
        </div>
    );
  }
}

Parallax.defaultProps = {
    color: "white",
    opacity: 1,
    popup: 0,
    animateat: null,
    staticclass: null,
};

export default Parallax;
