import React, { Component } from 'react'
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
    
  }
  

  componentDidMount() {
  
    navigator.geolocation.getCurrentPosition( position => {
      this.setState({
        userLat: position.coords.latitude,
        userLng: position.coords.longitude
      })
    })

    this.props.fetchNeeds();

  }
    
  render () {
    console.log(this.props.needs)
    console.log(this.state)

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
        needs={this.props.needs}
      />
    } else
    { MapElement = null}

    return (
      
      <div id="viewframe" className="container-fluid">

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <NeedsList needs={this.props.needs} />
          </div>

          <div className="col">
            {MapElement}
          </div>
        </div>
  
        
      </div>
    )
  }
  
}

const mapStateToProps = state => ({
  needs: state.needs.items
});

export default connect(mapStateToProps, { fetchNeeds })(Dashboard)