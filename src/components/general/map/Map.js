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

  async componentDidMount() {
    await this.loadMapScript()
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
    
    this.props.loadUserMarker(map)
    this.props.loadNeedsOTMarkers(map)
    this.props.loadNeedsMTMarkers(map)
    
  }
  
  render() {
    console.log(this.props.needs)
    // let MapContent
    // if (this.props.needs !== null) {
    //   MapContent = <div style={{ width: '100%', height: '93vh' }} id={this.props.id} />
    // } else {
    //   MapContent = null
    // }
    
    return (
      <div style={{ width: '100%', height: '92vh' }} id={this.props.id} />
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