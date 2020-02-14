import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {getUserLocation} from '../../actions/userLocationAction'
import Keys from '../../Keys'

class Map extends Component {
  constructor(props) {
    super(props);
    
    this.initMap = this.initMap.bind(this)
    this.loadMapScript = this.loadMapScript.bind(this)
    this.createMarkers = this.createMarkers.bind(this)
    this.addMarkers = this.addMarkers.bind(this)
    this.removeMarkers = this.removeMarkers.bind(this)
    
    var map  
    var activeMarker
    var userMarker

  }

  componentDidMount() {
    // this.checkMapScript()
    this.loadMapScript()
  }

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps) {
      this.removeMarkers()
    }
    // if(this.props.showMarkers !== prevProps.showMarkers){
    //   this.removeMarkers()
    // }
  }

  loadMapScript(){
    
    return new Promise((resolve) => {    
        if (document.getElementById('googleMaps')) {
                    
          this.createMarkers()
                          
        } else {
          let apiKey = Keys.googleMaps
          var s = document.createElement('script');
          s.id = 'googleMaps'
          s.type = 'text/javascript';
          s.src = `https://maps.google.com/maps/api/js?key=${apiKey}`;
          var x = document.getElementsByTagName('script')[0];
          x.parentNode.insertBefore(s, x);
          // Below is important. 
          //We cannot access google.maps until it's finished loading
          resolve (s.onload = (event) => {this.initMap()})
        }
      })
    
  }
  
  initMap() {
    return new Promise((resolve) =>{
      this.map = new window.google.maps.Map(
        document.getElementById(this.props.id),
        this.props.options)
    
        // this.setState({
        //   map: map
        // })
      
        console.log(this.map)

        // does this make sense? is the mehtod initmap waiting for the userlocation to be retrieved from the global state?
        resolve (this.props.getUserLocation())
    
        this.createMarkers()

    })
    
    
  }
  
    
  createMarkers(){
    console.log(this.map)
    if(this.map === undefined) {
      console.log('waiting for map to be defined')
    } else {
      if(this.props.userMarker) {
        this.userMarker = new window.google.maps.Marker({
          position: { lat: this.props.userMarker.lat, lng: this.props.userMarker.lng },
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 7
          },
          map: this.map
        });
        
      } 
        
      if(this.props.currentNeed) {
        const currentNeed = new window.google.maps.Marker({
          position: { lat: this.props.currentNeed.lat, lng: this.props.currentNeed.lng },
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          map: this.map     
        });
        } 
  
      // if(this.props.MTMarkers){
      //   const MTMarkers = this.props.MTMarkers.map( needs => { 
      //     return ( new window.google.maps.Marker({
      //       position: { lat: needs.lat, lng: needs.lng },
      //       icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      //       map: this.state.map}))})
      // }
      
      // if(this.props.OTMarkers){
      // const OTMarkers = this.props.OTMarkers.map( needs => { 
      //   return ( new window.google.maps.Marker({
      //     position: { lat: needs.lat, lng: needs.lng },
      //     icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      //     map: this.state.map}))})
      // }

      if(this.props.activeMarker === undefined || this.props.activeMarker.lat === undefined) {
        this.activeMarker = new window.google.maps.Marker({
          position: { lat: 0, lng: 0 },
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'    
          });
      } else {
        this.activeMarker = new window.google.maps.Marker({
          position: { lat: this.props.activeMarker.lat, lng: this.props.activeMarker.lng },
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'    
          });

      }
    this.addMarkers()
    }

  }

  addMarkers (){
    console.log(this.activeMarker)
    console.log(this.map)
    
    if(this.activeMarker) {
      if(this.props.showMarkers) {
        this.activeMarker.setMap(this.map)
      } 
    }

  }

  removeMarkers() {
    if(this.activeMarker) {
      if(this.props.showMarkers == false) {
        this.activeMarker.setMap(null)
      } 
    }

    this.loadMapScript()

  }
  

  componentWillUnmount(){
    let smap = document.getElementById('googleMaps')
    smap.remove()
    console.log('removing gmaps script')
  }
  
  render() {
    let MapContent
    if (this.props.userMarker !== null) {
      MapContent = <div style={{width: '100%', height:`${this.props.style.height}` }} id={this.props.id} />
    } else {
      MapContent = null
    }
    
    return (
      // <div style={{width: '100%', height:`${this.props.style.height}` }} id={this.props.id} />
      <Fragment>
        {MapContent}
      </Fragment>
      
    );
  }
}

Map.propTypes = {
  needs: PropTypes.array.isRequired,
  getUserLocation: PropTypes.func.isRequired,
  userLocation: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  needs: state.needs.items,
  userLocation: state.userCoords
});

export default connect(mapStateToProps, { getUserLocation })(Map)