import React from 'react';
import videojs from 'video.js';
import "video.js/dist/video-js.css";
import './styles/tree.css';

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      // //console.log('onPlayerReady', this);
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div data-vjs-player>
        <video class="video-js vjs-default-skin vjs-big-play-centered" ref={node => (this.videoNode = node)} className="video-js" />
      </div>
    );
  }
}
