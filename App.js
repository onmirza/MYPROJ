import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class App extends  React.PureComponent {
  constructor(props) {
    super(props);
    this.init();
    this.video = '8seOQEDuIQs' //video id
    window['onYouTubeIframeAPIReady'] = (e) => {
      this.YT = window['YT'];
      this.reframed = false;
      this.player = new window['YT'].Player('player', {
        videoId: this.video,
        events: {
          'onStateChange': this.onPlayerStateChange.bind(this),
          'onError': this.onPlayerError.bind(this),                    
          'onReady': (e) => {
            if (!this.reframed) {
              this.reframed = true;
              //reframe(e.target.a);
            }
          }
        }
      });
    };
    this.pauseVdo= this.pauseVdo.bind(this);
    this.playVdo= this.playVdo.bind(this);
    this.muteVdo= this.muteVdo.bind(this);
    this.stopVdo= this.stopVdo.bind(this);
    this.myFunction= this.myFunction.bind(this);
    
  }
  render() {
    const style = `.max-width-1024 { max-width: 1024px; margin: 0 auto; }`;
    return (<div>
        <style>{style}</style>
      <div className="max-width-1024">
      <div className="embed-responsive embed-responsive-16by9" id="player">
      </div>
      <div>
      <button onClick={this.muteVdo}>Mute</button> 
      <button onClick={this.pauseVdo}>Pause</button> 
      <button onClick={this.stopVdo}>Stop</button> 
      <button onClick={this.playVdo}>Play</button> 
      </div>
      <div>
      <input 
      id="myRange" 
      type="range" 
      min="0" max="280" 
      onChange={this.myFunction}
      step="1"/>
      </div>
    </div>

      </div>
    );
  }
  init() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  onPlayerStateChange(event) {
    console.log(event)
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime())
        };
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
          
        };
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
    };
  };
  //utility
  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  };

  playVdo() {
    this.player.playVideo()        
  };

  pauseVdo() {
    this.player.pauseVideo()        
  };

  stopVdo() {
    this.player.stopVideo()        
  };  
  
  muteVdo() {
    this.player.mute()       
  };


  myFunction() {
    var x = document.getElementById("myRange").value;
    this.player.seekTo(x);    
   };

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    };
  };
}

export default App;
