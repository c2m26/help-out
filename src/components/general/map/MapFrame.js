import React, { Component } from 'react'

class MapFrame extends Component {
  constructor(props){
    super(props)

    this.state = {
      userLat: '',
      userLng: ''
    }

    this.storeUserGeoposition = this.storeUserGeoposition.bind(this)
  }


  componentDidMount(){
       
    navigator.geolocation.getCurrentPosition(this.storeUserGeoposition)
    
  }

  storeUserGeoposition(position){
  
    this.setState({
      userLat: position.coords.latitude,
      userLng: position.coords.longitude

    })
  

  }

  render(){
    return(
      <div className="container">
        Your current location is
        <ul>
          <li>Latitude: {this.state.userLat}</li>  
          <li>Longitude: {this.state.userLng}</li>  
        </ul> 
        
      </div>
    )
  }
  
} export default MapFrame