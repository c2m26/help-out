import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchNeeds} from '../actions/needsAction'
import Map from '../general/map/Map'

import NeedsList from '../needs/NeedsList'
import './Dashboard.css'

class Dashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      userLat: null,
      userLng: null
    }
    
    this.getUserLocation=this.getUserLocation.bind(this)
  } 
  

  async componentDidMount() {
    await this.getUserLocation();
    await this.props.fetchNeeds();
  }

  getUserLocation(){
    navigator.geolocation.getCurrentPosition( position => {
      this.setState({
        userLat: position.coords.latitude,
        userLng: position.coords.longitude
      })
    })
  }

  componentDidUpdate(prevProps) {
    if(this.props.newNeed !== prevProps.newNeed) {
      this.props.fetchNeeds()
    }
  }

    
  render () {
    
    let MapElement
    if(this.props.needs !== null && this.state.userLng && this.state.userLat) {
      MapElement = 
      <Map
        id = "mapDashboard"
        options = {{
          center: {lat: this.state.userLat, lng: this.state.userLng},
          zoom: 15
        }}
        loadNeedsMarkers = {map => {
          this.props.needs.map( needs => { 
          return ( new window.google.maps.Marker({
          position: { lat: needs.lat, lng: needs.lng },
          map: map}))
          })}
        }
        loadUserMarker = {map => {
          new window.google.maps.Marker({
          position: { lat: this.state.userLat, lng: this.state.userLng },
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 7
          },
          map: map
          })}
        }
      />
    } else
    { MapElement = null}

    return (
      
      <div id="viewframe" className="container-fluid bg-light">

        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 py-2">
            <NeedsList needs={this.props.needs} />
          </div>

          <div className="col py-2">
            {MapElement}
          </div>
        </div>
  
        
      </div>
    )
  }
  
}

Dashboard.propTypes = {
  fetchNeeds: PropTypes.func.isRequired,
  needs: PropTypes.array.isRequired,
  newNeed: PropTypes.object
}

const mapStateToProps = state => ({
  needs: state.needs.items,
  newNeed: state.needs.item.data
});

export default connect(mapStateToProps, { fetchNeeds })(Dashboard)