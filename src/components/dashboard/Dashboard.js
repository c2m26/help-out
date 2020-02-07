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
      userLng: null,
      needsOT: [],
      needsMT: []
    }
    
    this.getUserLocation=this.getUserLocation.bind(this)
  } 
  

  async componentDidMount() {
    await this.getUserLocation();
    await this.props.fetchNeeds();
    await this.buildNeedsArrays();
    console.log(this.state)
  }

  getUserLocation(){
    navigator.geolocation.getCurrentPosition( position => {
      this.setState({
        userLat: position.coords.latitude,
        userLng: position.coords.longitude
      })
    })
  }

  buildNeedsArrays(){
    let material = []
    let oneTime = []

    for (let i=0; i<this.props.needs.length; i++) {
      if (this.props.needs[i].needType === 'material') {
        material.push(this.props.needs[i])
      } else {
        oneTime.push(this.props.needs[i])
      }
    };

    for (let i=0; i<material.length; i++) {
      material[i].showHighlight = false
    }

    for (let i=0; i<oneTime.length; i++) {
      oneTime[i].showHighlight = false
    }

    this.setState({
      needsMT: material,
      needsOT: oneTime
    })
  }

  // handleShowHighlight(){

  // }
  
  componentDidUpdate(prevProps) {
    if(this.props.newNeed !== prevProps.newNeed) {
      this.props.fetchNeeds()
      this.buildNeedsArrays()
    }
  }

    
  render () {
    
    let MapElement
    if(this.props.needs !== null && this.state.needsOT !== [] && this.state.needsMT !== [] && this.state.userLng && this.state.userLat) {
      MapElement = 
      <Map
        id = "mapDashboard"
        options = {{
          center: {lat: this.state.userLat, lng: this.state.userLng},
          zoom: 15
        }}
        // possible to make both map() inside of the same object?
        loadNeedsMTMarkers = {
          map => {
            this.state.needsMT.map( needs => { 
            return ( new window.google.maps.Marker({
            position: { lat: needs.lat, lng: needs.lng },
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            map: map}))})
          }
        }
        loadNeedsOTMarkers = {
          map => {
            this.state.needsOT.map( needs => { 
            return ( new window.google.maps.Marker({
            position: { lat: needs.lat, lng: needs.lng },
            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
            map: map}))})
          }
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
    {MapElement = null}

    return (
      
      <div id="viewframe" className="container-fluid bg-light">

        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pl-4 py-2">
            <NeedsList needs={this.props.needs} />
          </div>

          <div className="col py-2 pr-4">
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