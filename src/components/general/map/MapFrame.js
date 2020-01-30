import React, { Component } from 'react'
import Map from './Map'

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
      userLat: parseFloat(position.coords.latitude),
      userLng: parseFloat(position.coords.longitude)

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
        <Map
          id = "map1"
          options = {{
            center: {lat: this.state.userLat, lng: this.state.userLng},
            zoom: 14
          }}
        />
      </div>
    )
  }
  
} export default MapFrame