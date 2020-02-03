import React, { Component } from 'react'

import Map from '../general/map/Map'

import NeedsList from '../needs/NeedsList'
import './Dashboard.css'

class Dashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      needs: [],
      userLat: null,
      userLng: null
    }
    this.fetchNeeds = this.fetchNeeds.bind(this)
  }
  
  async componentDidMount() {

    await this.fetchNeeds()
    // fetching all needs from API
    // let urlneeds = 'http://localhost:3001/api/v1/needs'

    // await fetch(urlneeds, {
    //   method: 'GET',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then((response)=>{
    //   return response.json()
    // })
    // .then((data) =>{
    //   console.log(data)
    //   this.setState({
    //     needs: data
    //   })
    // })    
    // .catch(error => {
    //   console.log("Log In error", error)
    // })
    
    navigator.geolocation.getCurrentPosition( position => {
      this.setState({
        userLat: position.coords.latitude,
        userLng: position.coords.longitude
      })
    })
  }
  
  async fetchNeeds(){
    // fetching all needs from API
    let urlneeds = 'http://localhost:3001/api/v1/needs'

    await fetch(urlneeds, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{
      return response.json()
    })
    .then((data) =>{
      console.log(data)
      this.setState({
        needs: data
      })
    })    
    .catch(error => {
      console.log("Log In error", error)
    })
  }
  
  
  
  render () {
    console.log(this.state)
    let MapElement
    if(this.state.needs !== null && this.state.userLng && this.state.userLat) {
      MapElement = 
      <Map
        id = "mapDashboard"
        options = {{
          center: {lat: this.state.userLat, lng: this.state.userLng},
          zoom: 15
        }}
        loadNeedsMarkers = {map => {
          this.state.needs.map( needs => { 
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
        needs={this.state.needs}
      />
    } else
    { MapElement = null}

    return (
      <div id="viewframe" className="container-fluid">

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <NeedsList needs={this.state.needs} />
          </div>

          <div className="col">
            {MapElement}
          </div>
        </div>
  
        
      </div>
    )
  }
  
}

export default Dashboard