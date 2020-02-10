import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Keys from '../../Keys'

class Map extends Component {
  constructor(props) {
    super(props);
    this.initMap = this.initMap.bind(this)
    this.loadMapScript = this.loadMapScript.bind(this)
    // this.loadMarkers = this.loadMarkers.bind(this)
    
    
  }

  async componentDidMount() {
    await this.loadMapScript()
  }

  componentDidUpdate(prevProps) {
    if(this.props.needs !== prevProps.needs) {
      this.loadMapScript()
    }
    // if(this.props.activeMarker !== prevProps.activeMarker){
    //   this.loadMapScript()
    // }
  }

  loadMapScript(){
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
        this.initMap()
      })
    } else {
        this.initMap()
    }
  }
  
  async initMap() {
    var map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options)

    await this.setState({
      map: map
    })

    await this.loadMarkers()
  }
  
    // tested and not working; any way of making a condition that upon the function nto existing moves on with the code?
  //   if(this.props.loadNeedsActiveMarker()) {
  //     this.props.loadNeedsActiveMarker(map)
  //   } else {

  //   }
  //   this.props.loadNeedsMTMarkers(map)
  //   this.props.loadNeedsOTMarkers(map)
  //   this.props.loadUserMarker(map)
  // }
    
  loadMarkers(){
        
    if(this.props.userMarker) {
      const UserMarker = new window.google.maps.Marker({
      position: { lat: this.props.userMarker.lat, lng: this.props.userMarker.lng },
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 7
      },
      map: this.state.map
    }) } else {}

    if(this.props.currentNeed) {
      const currentNeed = new window.google.maps.Marker({
      position: { lat: this.props.currentNeed.lat, lng: this.props.currentNeed.lng },
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      map: this.state.map
    }) } else {}

    if(this.props.MTMarkers){
      const MTMarkers = this.props.MTMarkers.map( needs => { 
        return ( new window.google.maps.Marker({
        position: { lat: needs.lat, lng: needs.lng },
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        map: this.state.map}))})
    } else {}
    
    if(this.props.MTMarkers){
    const OTMarkers = this.props.OTMarkers.map( needs => { 
      return ( new window.google.maps.Marker({
      position: { lat: needs.lat, lng: needs.lng },
      icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      map: this.state.map}))})
      } else{}
  

  }
  
  render() {
    
    // let MapContent
    // if (this.props.needs !== null) {
    //   MapContent = <div style={{ width: '100%', height: '93vh' }} id={this.props.id} />
    // } else {
    //   MapContent = null
    // }
    
    return (
      <div style={{width: '100%', height:`${this.props.style.height}` }} id={this.props.id} />
      // <Fragment>
      //   {MapContent}
      // </Fragment>
      
    );
  }
}

Map.propTypes = {
  needs: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  needs: state.needs.items
});

export default connect(mapStateToProps, { })(Map)