import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchNeeds} from '../actions/needsAction'
import {getUserLocation} from '../actions/userLocationAction'
import Map from '../general/map/Map'
import NeedsList from '../needs/NeedsList'
import NeedCard from '../needs/NeedCard'
import './Dashboard.css'

class Dashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      userLat: null,
      userLng: null,
      needsOT: [],
      needsMT: [],
      needHighlight: {}
    }
    
    this.getUserLocation=this.getUserLocation.bind(this)
    this.handleShowHighlight=this.handleShowHighlight.bind(this)
    this.handleRemoveHighlight=this.handleRemoveHighlight.bind(this)
  } 
  

  async componentDidMount() {
    await this.getUserLocation();
    await this.props.fetchNeeds();
    await this.buildNeedsArrays();
    console.log(this.state)
  }

  // to be removed once working fine with redux
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

    // for (let i=0; i<material.length; i++) {
    //   material[i].showHighlight = false
    // }

    // for (let i=0; i<oneTime.length; i++) {
    //   oneTime[i].showHighlight = false
    // }

    this.setState({
      needsMT: material,
      needsOT: oneTime
    })
  }

  handleShowHighlight(props){
    console.log(props)
    for (let i=0; i<this.state.needsMT.length; i++) {
      if (this.state.needsMT[i].id === props) { 
        this.setState({ 
          needHighlight: this.state.needsMT[i]
        })
      } else {
        for (let i=0; i<this.state.needsOT.length; i++) {
          if (this.state.needsOT[i].id === props) {
            this.setState({ 
              needHighlight: this.state.needsMT[i]
            })
          }
        }
      }  
    }
  }

  handleRemoveHighlight(){
    this.setState({
      needHighlight: {}
    })
  }
  
  componentDidUpdate(prevProps) {
    if(this.props.newNeed !== prevProps.newNeed) {
      this.props.fetchNeeds()
      this.buildNeedsArrays()
    }
  }

    
  render () {
    
    let MapElement
    if(this.props.needs !== null && this.state.needsOT !== [] && this.state.needsMT !== [] && this.state.userLng !== null && this.state.userLat !== null) {
      MapElement = 
      <Map
        id = "mapDashboard"
        options = {{
          center: {lat: this.state.userLat, lng: this.state.userLng},
          zoom: 15
        }}
        activeMarker={
          {
            lat: this.state.needHighlight ? this.state.needHighlight.lat : null,
            lng: this.state.needHighlight ? this.state.needHighlight.lat : null
          }
        }
        MTMarkers={this.state.needsMT}
        OTMarkers={this.state.needsOT}
        userMarker={{
          lat: this.state.userLat,
          lng: this.state.userLng
        }}
        style={{height: '92vh'}}

        // possible to make both map() inside of the same object?
        // loadNeedsActiveMarker = {map => {
        //   new window.google.maps.Marker({
        //   position: { lat: this.state.needHighlight.lat, lng: this.state.needHighlight.lat },
        //   icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        //   map: map})}
        // }
        // loadNeedsMTMarkers = {
        //   map => {
        //     this.state.needsMT.map( needs => { 
        //     return ( new window.google.maps.Marker({
        //     position: { lat: needs.lat, lng: needs.lng },
        //     icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        //     map: map}))})
        //   }
        // }
        // loadNeedsOTMarkers = {
        //   map => {
        //     this.state.needsOT.map( needs => { 
        //     return ( new window.google.maps.Marker({
        //     position: { lat: needs.lat, lng: needs.lng },
        //     icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
        //     map: map}))})
        //   }
        // }
        
        // loadUserMarker = {map => {
        //   new window.google.maps.Marker({
        //   position: { lat: this.state.userLat, lng: this.state.userLng },
        //   icon: {
        //     path: window.google.maps.SymbolPath.CIRCLE,
        //     scale: 7
        //   },
        //   map: map
        //   })}
        // }
      />
    } else
    {MapElement = null}

    return (
      
      <div id="viewframe" className="container-fluid bg-light">

        <div className="row px-3">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 py-2">
            <NeedsList
              content={ this.props.needs.map(
                needs => {
                  return(
                    <NeedCard
                      key={needs.id} 
                      needs={needs}
                      handleShowHighlight={this.handleShowHighlight}
                      handleRemoveHighlight={this.handleRemoveHighlight}
                    />
                  )
                }
              )}
            />
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
  newNeed: PropTypes.object,
  getUserLocation: PropTypes.func.isRequired,
  userLocation: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  needs: state.needs.items,
  newNeed: state.needs.item.data,
  userLocation: state.userCoords
});

export default connect(mapStateToProps, { fetchNeeds, getUserLocation})(Dashboard)