import React, { Component } from 'react'

import Map from '../general/map/Map'

import NeedsList from '../needs/NeedsList'

class Dashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      needs: [],
      userLat: null,
      userLng: null
    }
    // this.getUserGeolocation=this.getUserGeolocation.bind(this)
    // this.fetchNeeds=this.fetchNeeds.bind(this)
  }
  
  // fetchNeeds() {
  //  // fetching all needs from API
  //  let urlneeds = 'http://localhost:3001/api/v1/needs'

  //  fetch(urlneeds, {
  //    method: 'GET',
  //    credentials: 'include',
  //    headers: {
  //      'Content-Type': 'application/json'
  //    }
  //  })
  //  .then((response)=>{
  //    return response.json()
  //  })
  //  .then((data) =>{
  //    console.log(data)
  //    this.setState({
  //      needs: data
  //    })
  //  })    
  //  .catch(error => {
  //    console.log("Log In error", error)
  //  })
  // }
  

  // getUserGeolocation(){
  //   navigator.geolocation.getCurrentPosition( position => {
  //     this.setState({
  //       userLat: position.coords.latitude,
  //       userLng: position.coords.longitude
  //     })
  //   })
  // }

  async componentDidMount() {

    // this.fetchNeeds()
    // this.getUserGeolocation()
    
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
    
    navigator.geolocation.getCurrentPosition( position => {
      this.setState({
        userLat: position.coords.latitude,
        userLng: position.coords.longitude
      })
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
          zoom: 14
        }}
        needs={this.state.needs}
      />
    } else
    { MapElement = null}

    return (
      <div className="container-fluid">

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <NeedsList needs={this.state.needs} />
          </div>

          <div className="col">
            {MapElement}
              {/* <Map
              id = "mapDashboard"
              options = {{
                center: {lat: this.state.userLat, lng: this.state.userLng},
                zoom: 14
              }}
              needs={this.state.needs}
              /> */}
          </div>
        </div>
  
        
      </div>
    )
  }
  
}

export default Dashboard