import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchNeeds} from '../actions/needsAction'
import {getUserLocation} from '../actions/userLocationAction'
import Map from '../general/map/Map'
import { Link } from 'react-router-dom'


class NeedDetail extends Component {
  constructor(props){
    super(props)

    this.state = {
      selectedNeedID: parseInt(this.props.match.params.id) ,
      selectedNeed: {},
      fulfillmentID: null,
      userFulfillments: null
    }
    

    this.handleFulfill = this.handleFulfill.bind(this)
    this.checkHelperID = this.checkHelperID.bind(this)
    this.getUserFulfillments = this.getUserFulfillments.bind(this)
    this.checkUserFulfillment = this.checkUserFulfillment.bind(this)
    this.createFulfillment = this.createFulfillment.bind(this)
    this.createConversation = this.createConversation.bind(this)
    
  }

  async componentDidMount(){ 
    await this.props.fetchNeeds();
    this.assignSelectedNeed()
  }

  assignSelectedNeed(){
    
    for (let i = 0; i < this.props.needs.length; i++) {
      if (typeof this.props.needs[i] !== "undefined") {
        if(this.props.needs[i].id === this.state.selectedNeedID) {
          this.setState({
            selectedNeed: this.props.needs[i]
          })
          break
        }
      }
    }
  }

  // Fulfillment related methods ; called once user clicks on "fulfill" button
  handleFulfill(event) {
    event.preventDefault();
    this.checkHelperID();  
  }
  
  // checks if user voluteering to fulfill the request is the one that created the request
  checkHelperID() {
    if(this.props.user.id === this.state.selectedNeed.userID){
      alert("You have created this help request and cannot volunteer to fulfill it!");
      this.props.history.push("/dashboard")
    } else {
      this.getUserFulfillments()
    }
  }

  // fetches current user fulfillments
  async getUserFulfillments() {
    
    const url = `http://localhost:3001/api/v1/fulfillments/get_userFulfillments?id=${this.props.user.id}`;
    
    await fetch(url, {
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
      console.log(data);
      this.setState({
        userFulfillments: data.data
      })
    })    
    .catch(error => {
      console.log("Error getting the user created help need requests", error)
    })

    this.checkUserFulfillment()
  }

  // chekcs if user is trying to fulfill a need twice. if so, user is alerted and redirected to open help requests page (dashboard)
  checkUserFulfillment() {
    let repeatedFulfillmentCount = 0
    for(let i=0; i<this.state.userFulfillments.length; i++) {
      if(this.state.userFulfillments[i].needID === this.state.selectedNeedID){
        repeatedFulfillmentCount++
      }
    }

    if(repeatedFulfillmentCount > 0) {
      alert("You have already volunteered to fulfill this help request!");
      this.props.history.push("/dashboard")
    } else {
      this.createFulfillment()
    }
  }
  
  
  async createFulfillment(){

    const url = 'http://localhost:3001/api/v1/fulfillments';
    const data = {
      needID: this.state.selectedNeedID,
      helperID: this.props.user.id
    }

    console.log(JSON.stringify(data))
    
    await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    
    .then((response)=>{
      return response.json()
    })
    .then((payload) =>{
      this.setState({
        fulfillmentID: payload.data.id
      })
      console.log(payload)
      // this.props.history.push(`/fulfillment/${this.state.fulfillmentID}`)
    })    
    .catch(error => {
      console.log("Error", error)
    })

    this.createConversation()
  }

  createConversation(){
    
    const url = 'http://localhost:3001/api/v1/conversations';
    const data = {
      fulfillmentID: this.state.fulfillmentID
    }

    console.log(JSON.stringify(data))
    
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    
    .then((response)=>{
      return response.json()
    })
    .then((payload) =>{
      // this.setState({
      //   fulfillmentID: payload.data.id
      // })
      console.log(payload)
      this.props.history.push(`/fulfillment/${this.state.fulfillmentID}`)
    })    
    .catch(error => {
      console.log("Error", error)
    })
  }

  
  render(){

    let MapElement
    if(typeof this.state.selectedNeed.lat !== "undefined") {
      console.log("passing in render map", this.state.selectedNeed.lat)
      MapElement = 
      <Map
      id = "mapDashboard"
      style={{height: '60vh'}}
      options = {{
        center: {
          lat: this.state.selectedNeed.lat,
          lng: this.state.selectedNeed.lng
          },
          zoom: 14
      }}
      // userMarker={this.props.userLocation}
      currentNeed={
        {
        lat: this.state.selectedNeed.lat,
        lng: this.state.selectedNeed.lng
        }
      }
      />
    } else {
      MapElement = null;
      console.log("no map")
    }

    let needType
    if(this.state.selectedNeed.needType === "material"){
      needType = <div className="badge badge-pill badge-danger">material</div>
    } else {
      needType = <div className="badge badge-pill badge-warning">one time</div>
    }

    
    return(
      <div className="container-fluid">
        <div className="d-flex flex-column flex-fill justify-content-center align-items-center" style={{height: 'calc(100vh - 58px)'}}>
          <div className="card bg-light col-xl-6 col-lg-10 col-md-11 col-sm-11 col-11">
            <div className="card-body">
              <div className="row">
                <div className="col-xl-10 col-lg-10 col-md-9 col-sm-9 col-9">
                <h5 className="card-title">{this.state.selectedNeed.title}</h5>
                <p className="card-text">{this.state.selectedNeed.description}</p>
                <p className="card-text">{this.state.selectedNeed.formattedAddress}</p>
                </div>
                <div className="col d-flex flex-column justify-content-around aling-items-center">
                  
                  <Link to="/dashboard" className="btn btn-warning">Back</Link>

                  <button className="btn btn-primary" onClick={this.handleFulfill}>Fulfill</button>
                </div>
                
              </div>
              <div className="d-flex justify-content-between mt-2">
                {needType}
                {/* <div><span className="pr-2">Type:</span>{this.state.selectedNeed.needType}</div>
                <div><span className="pr-2">Status:</span>{this.state.selectedNeed.status}</div> */}
              </div>
            </div>
            <div className="pb-3">
              {MapElement}
            </div>
          </div>
        </div>
      </div>
      
    )
  }
}

NeedDetail.propTypes = {
  getUserLocation: PropTypes.func.isRequired,
  userLocation: PropTypes.object.isRequired,
  fetchNeeds: PropTypes.func.isRequired,
  needs: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  needs: state.needs.items,
  userLocation: state.userCoords
});

export default connect(mapStateToProps, { fetchNeeds, getUserLocation })(NeedDetail)