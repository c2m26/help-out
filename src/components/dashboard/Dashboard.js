import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchNeeds} from '../actions/needsAction'
import {getUserLocation} from '../actions/userLocationAction'
import Map from '../general/map/Map'
import NeedsList from '../needs/NeedsList'
import NeedCard from '../needs/NeedCard'
import './Dashboard.css'

export class Dashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      fulfillments: [],
      activeFulfillments: [],
      conversations: [],
      messages: [],
      openNeeds: [],
      activedNeeds: [],
      needsOT: [],
      needsMT: [],
      needHL: {},
      showMarkers: true
    }
    
    this.handleRemoveHighlight=this.handleRemoveHighlight.bind(this)
    this.buildNeedsArrays = this.buildNeedsArrays.bind(this)
    this.getFulfillments = this.getFulfillments.bind(this);
    this.getConversations = this.getConversations.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.buildActiveFulfillments = this.buildActiveFulfillments.bind(this)
    this.buildOpenNeeds = this.buildOpenNeeds.bind(this)
    this.buildActiveNeeds = this.buildActiveNeeds.bind(this)
  } 
  
  async componentDidMount() {

      await this.props.getUserLocation();
      await this.props.fetchNeeds();
      this.getFulfillments();
  }

  async getFulfillments() {
    
    const url = 'http://localhost:3001/api/v1/fulfillments';
    
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
        fulfillments: data
      })
    })    
    .catch(error => {
      console.log("Error getting fulfillments", error)
    })

    this.getConversations()
  }


  async getConversations() {
    
    const url = 'http://localhost:3001/api/v1/conversations';
    
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
        conversations: data
      })
    })    
    .catch(error => {
      console.log("Error getting conversations", error)
    })

    this.getMessages()
  }

  async getMessages() {
    
    const url = 'http://localhost:3001/api/v1/messages';
    
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
        messages: data
      })
    })    
    .catch(error => {
      console.log("Error getting messages", error)
    })

    this.buildActiveFulfillments()
    
  }

  buildActiveFulfillments(){
    let auxConversation = []
    
    // Builds an array with conversation objects including the helperID
    for(let i=0; i<this.state.fulfillments.length; i++) {
      for(let j=0; j<this.state.conversations.length; j++){
        if(this.state.fulfillments[i].id === this.state.conversations[j].fulfillmentID){
          let auxBuild = []
          auxBuild = this.state.conversations[j]
          auxBuild.helperID = this.state.fulfillments[i].helperID
          auxConversation.push(auxBuild);
        }
      }
      console.log(auxConversation)
    }

    
    // Checks if there are messages by the helper in the conversation. if not, it removes that conversation from the array auxConversation
    for(let i=0; i<auxConversation.length; i++) {
      
      // filters messages by conversation
      let filteredMessages = 0
      let conversationID = 0
      conversationID = auxConversation[i].id
      let messages = this.state.messages
  
      filteredMessages = messages.filter(messages => messages.conversationID === conversationID)

      console.log(filteredMessages)
      
      // checks if there are messages by the helper in the conversation
      let auxCountSenderMessages = 0
      
      for(let j=0; j<filteredMessages.length; j++) {
        if(auxConversation[i].helperID === filteredMessages[j].senderID) {
          auxCountSenderMessages++
        }
      }

      console.log(auxCountSenderMessages)
      
      if(auxCountSenderMessages === 0) {
        console.log(auxConversation[i])
        auxConversation.splice(i,1)
      }
    }
    console.log(auxConversation) 

    // creates active fulfillment array based on the fulfillments part of auxConversation (i.e. conversations which have at least one message sent by the helper)
    let auxActiveFulfillment = []

    for(let i=0; i<this.state.fulfillments.length; i++) {
      for(let j=0; j<auxConversation.length; j++) {
        if(this.state.fulfillments[i].id === auxConversation[j].fulfillmentID) {
          auxActiveFulfillment.push(this.state.fulfillments[i])
        }
      }
    }
    console.log(auxActiveFulfillment)
    this.setState({
      activeFulfillments: auxActiveFulfillment
    })
    
    this.buildOpenNeeds()
  }

  // filters needs; condition status = "open"
  buildOpenNeeds() {
    let auxOpenNeeds = []
    let needs = this.props.needs
    auxOpenNeeds = needs.filter(needs => needs.status === "open")
    console.log(auxOpenNeeds)

    this.setState({
      openNeeds: auxOpenNeeds
    })

    this.buildActiveNeeds()
  }

  // builds Active Needs => Needs that have less than 5 fulfillments 
  buildActiveNeeds() {
    let auxActiveNeeds = []

    for(let i=0; i<this.state.openNeeds.length; i++) {
      let auxCountNeedFulfillments = 0
      
      for(let j=0; j<this.state.activeFulfillments.length; j++) {
        if(this.state.openNeeds[i].id === this.state.activeFulfillments[j].needID) {
          auxCountNeedFulfillments++
        }
      }
      console.log(auxCountNeedFulfillments, this.state.openNeeds[i].id)
      
      if(auxCountNeedFulfillments < 5) {
        console.log(this.state.openNeeds[i])
        auxActiveNeeds.push(this.state.openNeeds[i])
      }
    }
    console.log(auxActiveNeeds)
    this.setState({
      activedNeeds: auxActiveNeeds
    })

    this.buildNeedsArrays()
  }
  // creates one array for each type of need - one time and material - to be shown in the map
  buildNeedsArrays(needHighID){
    console.log(needHighID)
    
    let material = []
    let oneTime = []
    let needHighlight = {}
    
    for (let i=0; i<this.state.activedNeeds.length; i++) {
      if (this.state.activedNeeds[i].needType === 'material') {
        material.push(this.state.activedNeeds[i])
      } else {
        oneTime.push(this.state.activedNeeds[i])
      }
      console.log("MT & OT arrays built")
    }

    for (let i=0; i<material.length; i++) { 
      if (material[i].id === needHighID) { 
        needHighlight = material[i]
        material.splice(i,1)
        break
      }
    } 
        
    for (let i=0; i<oneTime.length; i++) {
      if (oneTime[i].id === needHighID) {
        needHighlight = oneTime[i]
        oneTime.splice(i,1)
        break
      }
    }

    this.setState({
      needsMT: material,
      needsOT: oneTime,
      needHL: needHighlight,
      showMarkers: true
    })
    console.log(this.state.needHL)
  }

  handleRemoveHighlight(data){
    
    this.setState({
      showMarkers: data
    })
    console.log('passou no remove', data)
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(this.props.newNeed !== prevProps.newNeed) {
      this.props.fetchNeeds()
      this.getFulfillments()
    }
    if(this.state.showMarkers !== prevState.showMarkers) {
      this.buildNeedsArrays()
    }
  }

    
  render () {
    let MapElement
    if(typeof this.props.needs !== "undefined" && typeof this.state.needsOT !== "undefined" && typeof this.state.needsMT !== "undefined" && typeof this.props.userLocation.lng !== "undefined" && typeof this.props.userLocation.lat !== "undefined") {
      // console.log("passing in render map")
      MapElement = 
      <Map
        id = "mapDashboard"
        
        options = {{
          center: {lat: this.props.userLocation.lat, lng: this.props.userLocation.lng},
          zoom: 15
        }}
        
        activeMarker={
          {
            lat: this.state.needHL.lat,
            lng: this.state.needHL.lng
          }
        }
        
        MTMarkers={this.state.needsMT}
        OTMarkers={this.state.needsOT}

        showMarkers={this.state.showMarkers}
        
        style={{height: '92vh'}}

        history = {this.props.history}
      />
    } else {MapElement = "Loading map..."}

    return (
      
      <div id="viewframe" className="container-fluid">

        <div data-testid="content" className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 py-2">
            <NeedsList
              content= {this.state.activedNeeds.map(
                need => {
                  return(
                    <NeedCard
                      key={need.id} 
                      need={need}
                      buildNeedsArrays={this.buildNeedsArrays}
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

export default connect(mapStateToProps, { fetchNeeds, getUserLocation })(Dashboard)