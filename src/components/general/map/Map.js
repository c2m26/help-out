import React, { Component, Fragment } from 'react';
import Keys from '../../Keys'

class Map extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this)
    this.loadUserMarker = this.loadUserMarker.bind(this)
    // this.loadNeedsMarkers = this.loadNeedsMarkers.bind(this)
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

  onScriptLoad() {
    const mapa = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
      this.loadUserMarker(mapa)
      // this.loadNeedsMarkers(mapa)
  }

  loadUserMarker(mapa) {
    
    new window.google.maps.Marker({
      position: { lat: this.props.options.center.lat, lng: this.props.options.center.lng },
      map: mapa
    });
    console.log(this.props.options.center.lat)
    console.log(this.props.needs)
    
    this.props.needs.map( needs => { 
      return ( new window.google.maps.Marker({
      position: { lat: needs.lat, lng: needs.lng },
      map: mapa}))
    })
    
    console.log(this.props.needs)
  }
  
  // componentDidUpdate(prevProps) {
 
  //   if(this.props.needs !== prevProps.needs) {
  //     this.onScriptLoad()
  //   }
    
  // }

  // loadNeedsMarkers(mapa){
  //   this.props.needs.map( needs => { 
  //     return ( new window.google.maps.Marker({
  //     position: { lat: needs.lat, lng: needs.lng },
  //     map: mapa}))
  //   })
  // }

  render() {
    console.log(this.props.needs)
    let MapContent
    if (this.props.needs !== null) {
      MapContent = <div style={{ width: '100%', height: '80vh' }} id={this.props.id} />
    } else {
      MapContent = null
    }
    
    return (
      // <div style={{ width: '100%', height: '80vh' }} id={this.props.id} />
      <Fragment>
        {MapContent}
      </Fragment>
      
    );
  }
}

export default Map