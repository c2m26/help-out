import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchNeeds} from '../actions/needsAction'
import {getUserLocation} from '../actions/userLocationAction'
import {backendURL} from '../APIendpoints'
import Map from '../general/map/Map'

export class NeedDetail extends Component {
  constructor(props){
    super(props)

    this.state = {
      selectedNeedID: parseInt(this.props.match.params.id) ,
      selectedNeed: [],
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
      if (this.props.needs[i]) {
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
    
    const url = `${backendURL}/api/v1/fulfillments/get_userFulfillments?id=${this.props.user.id}`;
    
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

    const url = `${backendURL}/api/v1/fulfillments`;
    const data = {
      needID: this.state.selectedNeedID,
      helperID: this.props.user.id
    }
    
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
    })    
    .catch(error => {
      console.log("Error", error)
    })

    this.createConversation()
  }

  createConversation(){
    
    const url = `${backendURL}/api/v1/conversations`;
    const data = {
      fulfillmentID: this.state.fulfillmentID
    }
    
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
      this.props.history.push(`/fulfillment/${this.state.fulfillmentID}`)
    })    
    .catch(error => {
      console.log("Error", error)
    })
  }

  
  render(){

    let MapElement
    if(typeof this.state.selectedNeed.lat !== "undefined") {
      MapElement = 
        <Map
        id = "mapDashboard"
        style={{height: '42vh'}}
        options = {{
          center: {
            lat: this.state.selectedNeed.lat || 0,
            lng: this.state.selectedNeed.lng || 0
            },
            zoom: 14
        }}
        currentNeed={
          {
          lat: this.state.selectedNeed.lat || 0,
          lng: this.state.selectedNeed.lng || 0
          }
        }
        />
    } else {
      MapElement = null;
    }

    let needType
    if(this.state.selectedNeed) {
      if(this.state.selectedNeed.needType === "material"){
        needType = <div className="badge badge-pill badge-danger">material</div>
      } else {
        needType = <div className="badge badge-pill badge-warning">one time</div>
      }
    }
    

    
    return(
      
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height: 'calc(100vh - 58px)'}}>
          <div className="container-fluid d-flex flex-fill justify-content-center align-items-center p-0">
            <div className="card-body bg-light d-flex flex-column justify-content-between col-xl-6 col-lg-10 col-md-11 col-sm-12 col-12">
              <div data-testid="need-data">
                <div className="card-title row mb-2">
                  <div className="col-xl-10 col-lg-10 col-md-9 col-sm-9 col-9 d-flex align-items-center">
                    <h5>{this.state.selectedNeed.title}</h5>
                  </div>            
                  <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-3 p-0 d-flex justify-content-around align-items-center">
                    <button className="btn btn-primary" onClick={this.handleFulfill}>Fulfill</button>
                  </div>
                </div>
                <div>
                  <p className="card-text">{this.state.selectedNeed.description}</p>
                  <p className="card-text">{this.state.selectedNeed.formattedAddress}</p>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  {needType}
                </div>
              </div>

              <div className="pt-4">
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