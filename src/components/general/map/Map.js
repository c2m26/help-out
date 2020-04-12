import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {getUserLocation} from '../../actions/userLocationAction'

class Map extends Component {
  constructor(props) {
    super(props);
    
    this.initMap = this.initMap.bind(this)
    this.loadMapScript = this.loadMapScript.bind(this)
    this.createMarkers = this.createMarkers.bind(this)
    this.addMarkers = this.addMarkers.bind(this)
    this.removeMarkers = this.removeMarkers.bind(this)
    
    this.map = null 
    this.activeMarker = null
    this.userMarker = []
    this.MTMarkers = []
    this.OTMarkers = []
  }

  componentDidMount() {
    this.loadMapScript()
  }

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps && window.google) {
      this.removeMarkers()
    }
    // if(this.props !== prevProps && !window.google && !this.map) {
    //   this.loadMapScript()
    // } else {
    //   this.removeMarkers()
    // }
  }

  componentWillUnmount(){
    this.map = null
  }

  loadMapScript(){
    if (window.google) {
      this.initMap()  
    } else {
      var s = document.createElement('script');
      s.id = 'googleMaps'
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=${process.env.REACT_APP_GMAPS_API_KEY}`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      //We cannot access google.maps until it's finished loading
      s.onload = (event) => 
        {
          this.initMap();
        }
    }
  }
  
  initMap() {
    this.map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    this.props.getUserLocation();
    this.createMarkers();
  }
  
    
  createMarkers(){
       
    if(this.props.userLocation) {
      this.userLocation = new window.google.maps.Marker({
        position: { lat: this.props.userLocation.lat, lng: this.props.userLocation.lng },
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 7
        },
        map: this.map
      });
    } 
    
    // marker for map in need detail component
    if(this.props.currentNeed) {
      this.currentNeed = new window.google.maps.Marker({
        position: { lat: this.props.currentNeed.lat, lng: this.props.currentNeed.lng },
        icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        map: this.map     
      });
    } 

    if(this.props.MTMarkers.length){
      this.MTMarkers = this.props.MTMarkers.map( needs => { 
        return ( new window.google.maps.Marker({
          position: { lat: needs.lat, lng: needs.lng },
          icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          url: `/helpNeed/${needs.id}`
          }))
        })
    }
  
    if(this.props.OTMarkers.length){
      this.OTMarkers = this.props.OTMarkers.map( needs => { 
        return ( new window.google.maps.Marker({
          position: { lat: needs.lat, lng: needs.lng },
          icon: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
          url: `/helpNeed/${needs.id}`
          }))
        })
    }

    if(this.props.activeMarker) {
      this.activeMarker = new window.google.maps.Marker({
        position: { lat: this.props.activeMarker.lat, lng: this.props.activeMarker.lng },
        icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'    
        });
      }

    this.addMarkers()
  }

  addMarkers (){

    if(this.activeMarker) {
      if(this.props.showMarkers) {
        this.activeMarker.setMap(this.map);
      } 
    }

    if(this.MTMarkers.length){
      for (let i = 0; i < this.MTMarkers.length; i++) {
        this.MTMarkers[i].setMap(this.map);
        const history = this.props.history
        window.google.maps.event.addListener(this.MTMarkers[i], 'click', function (event) {
          history.push(`${this.url}`)
        }
        );
      }
    }

    if(this.OTMarkers.length){
      for (let i = 0; i < this.OTMarkers.length; i++) {
        this.OTMarkers[i].setMap(this.map)
        const history = this.props.history
        window.google.maps.event.addListener(this.OTMarkers[i], 'click', function (event) {
          history.push(`${this.url}`)
        }
        );
      }
    }

  }

  removeMarkers() {
    
    if(this.props.showMarkers === false && this.activeMarker) {
      this.activeMarker.setMap(null)
    }

    if(this.MTMarkers.length){
      for (let i = 0; i < this.MTMarkers.length; i++) {
        this.MTMarkers[i].setMap(null)
      }
    }

    if(this.OTMarkers.length){
      for (let i = 0; i < this.OTMarkers.length; i++) {
        this.OTMarkers[i].setMap(null)
      }
    }
    this.createMarkers()
}
  
  render() {
    let MapContent
    if (this.props.userLocation !== undefined) {
      MapContent = <div style={{width: '100%', height:`${this.props.style.height}` }} id={this.props.id} />
    } else {
      MapContent = null
    }
    
    return (
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

Map.defaultProps = {
  MTMarkers: [],
  OTMarkers: [],
  currentNeed: null,
  userLocation: null,
  activeMarker: {lat: 0, lng:0}
} 

export default connect(mapStateToProps, { getUserLocation })(Map)