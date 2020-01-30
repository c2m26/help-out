import React, { Component } from 'react';
import Keys from '../../Keys'

class Map extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this)
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
      this.loadMarkers(map)
  }

  loadMarkers(map) {
    var marker = new window.google.maps.Marker({
      position: { lat: this.props.options.center.lat, lng: this.props.options.center.lng },
      map: map
      
    });
  }

  componentDidMount() {
    if (!window.google) {
      let apiKey = Keys.googleMaps
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=${apiKey}`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. 
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  render() {
    return (
      <div style={{ width: '100%', height: '80vh' }} id={this.props.id} />
    );
  }
}

export default Map