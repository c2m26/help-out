import React, { Component } from 'react'


class MapFrame extends Component {
  constructor(props){
    super(props)

    this.state = {
      userLat: null,
      userLng: null
    }
  }
    

  // async componentDidMount(){
      //  
  //   await navigator.geolocation.getCurrentPosition( position => {
  //     this.setState({
  //       userLat: position.coords.latitude,
  //       userLng: position.coords.longitude
  //     })
  //   })

  //   this.handleUserCoord ()   
  // }

  // handleUserCoord(){
  //   this.props.handleUserCoord(this.state)
  // }


  render(){
    return(
      <div className="container">
        Your current location is
        <ul>
          <li>Latitude: {this.props.userLat}</li>  
          <li>Longitude: {this.props.userLng}</li>  
        </ul> 
        {/* <Map
          id = "mapDashboard"
          options = {{
            center: {lat: this.state.userLat, lng: this.state.userLng},
            zoom: 14
          }}
        /> */}
        {this.props.content}
      </div>
    )
  }
  
} export default MapFrame