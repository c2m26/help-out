import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Keys from '../../Keys'

class Map extends Component {
  constructor(props) {
    super(props);
    this.initMap = this.initMap.bind(this)
    this.loadMapScript = this.loadMapScript.bind(this)
  }

  componentDidMount() {
    this.loadMapScript()
  }

  componentDidUpdate(prevProps) {
    if(this.props.needs !== prevProps.needs) {
      this.loadMapScript()
    }
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
  
  initMap() {
    var map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
      
    // new window.google.maps.Marker({
    //   position: { lat: this.props.options.center.lat, lng: this.props.options.center.lng },
    //   icon: {
    //     path: window.google.maps.SymbolPath.CIRCLE,
    //     scale: 7
    //   },
    //   map: map
    // });
    
    // this.props.needs.map( needs => { 
    //   return ( new window.google.maps.Marker({
    //   position: { lat: needs.lat, lng: needs.lng },
    //   map: map}))
    // })
    this.props.loadUserMarker(map)
    this.props.loadNeedsMarkers(map)
    
  }
  
  render() {
    console.log(this.props.needs)
    let MapContent
    if (this.props.needs !== null) {
      MapContent = <div style={{ width: '100%', height: '93vh' }} id={this.props.id} />
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

Map.propTypes = {
  needs: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  needs: state.needs.items
});

export default connect(mapStateToProps, { })(Map)