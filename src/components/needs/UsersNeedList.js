import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchNeeds} from '../actions/needsAction'
import UserNeedCard from "./UserNeedCard"
import UserFulfillmentCard from "./UserFulfillmentCard"

class UsersNeedList extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      userNeeds: [],
      userOpenNeeds: [],
      Fulfillments: [],
      needFulfillments: [],
      userFulfillments: [],
      userFulfillmentsDetails: []
    }

    this.getUserNeeds = this.getUserNeeds.bind(this)
    this.filterOpenNeeds = this.filterOpenNeeds.bind(this)
    this.buildNeedFulfillments = this.buildNeedFulfillments.bind(this)
    this.evaluateRepublishing = this.evaluateRepublishing.bind(this)
    this.getUserFulfillments = this.getUserFulfillments.bind(this)
    this.getUserFulfillmentsDetails = this.getUserFulfillmentsDetails.bind(this)
  }

  componentDidMount() {
    this.getUserNeeds()
  }

  componentDidUpdate(prevProps){
    if(this.props.user !== prevProps.user) {
      this.getUserNeeds()
    }
    if(this.props.newNeed !== prevProps.newNeed) {
      this.props.fetchNeeds()
      this.getUserNeeds()
    }
  }

  async getUserNeeds() {
    this.props.fetchNeeds()

    const userID = this.props.user.id
    console.log(userID)

    const url = `http://localhost:3001/api/v1/needs/get_userNeeds?id=${userID}`;
    
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
        userNeeds: data
      })
    })    
    .catch(error => {
      console.log("Error getting the user created help need requests", error)
    })
    
    this.filterOpenNeeds()  
  }

  filterOpenNeeds() {
    console.log(this.state.userNeeds.filter(needs => needs.status === "open"))

    if(this.state.userNeeds.filter(needs => needs.status === "open") === null){
      this.getFulfillments()  
    } else {
    this.setState({
      userOpenNeeds: this.state.userNeeds.filter(needs => needs.status === "open")
    })
    this.getFulfillments()
    }
  }

  async getFulfillments(){

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
        Fulfillments: data
      })
    })    
    .catch(error => {
      console.log("Error getting fulfillments", error)
    })
  
    this.buildNeedFulfillments()
  }

  // iterates through the openNeeds array to create one array per need including all fulfillments
  buildNeedFulfillments(){
    let auxNeedFulfillment = []

    for(let i=0; i<this.state.userOpenNeeds.length; i++){
      auxNeedFulfillment.push(this.state.Fulfillments.filter(Fulfillment => Fulfillment.needID === this.state.userOpenNeeds[i].id))
      console.log(auxNeedFulfillment)
    }

    this.setState({
      needFulfillments: auxNeedFulfillment
    })

    this.evaluateRepublishing()
  }

  
  // checks if all the fulfillments associated to a need are older than 24 hours since the Need creation and sets the republishing status
  evaluateRepublishing(){
    let auxOpenNeeds = []
  // checks if all the fulfillments associated to a need are older than 24 hours since the Need creation, if yes, then it assigns to the need a property republish with the bolean true
    for( let i=0; i<this.state.needFulfillments.length; i++){
      if(typeof this.state.needFulfillments[i][0] === "undefined") {
        continue
      }
      let needID = this.state.needFulfillments[i][0].needID
      let auxOpenNeed = this.state.userOpenNeeds.filter(need => need.id === needID)
      let auxNeedDate = new Date(auxOpenNeed[0].created_at)
      let auxNeedTime = auxNeedDate.getTime()
      let ageCounter = 0
      console.log(needID, auxOpenNeed)

      for(let j=0; j<this.state.needFulfillments[i].length; j++){
        let auxFulfillmentDate = new Date(this.state.needFulfillments[i][j].created_at)
        let auxFulfillmentTime = auxFulfillmentDate.getTime()
        let ageFulfillment = auxFulfillmentTime-auxNeedTime
        let ageReference = 24*60*60*1000
        console.log("passa aqui")
        console.log(auxFulfillmentTime, auxNeedTime)

        if(ageFulfillment > ageReference) {
          ageCounter++
        }
      }
      console.log(ageCounter)
      // condition making ageCounter = 5 to address the fact that not only the time from last fulfiment being more than 24h
      // but also that a republish only makes sense when the need is not shown anymore to all users, which only happens
      // when the number of helpers fulfilling the request is 5
      let minHelpers = 5
      if(ageCounter === this.state.needFulfillments[i].length && ageCounter === minHelpers){
        auxOpenNeed[0].republish = true
        auxOpenNeeds.push(auxOpenNeed[0])
      } else {
        auxOpenNeed[0].republish = false
        auxOpenNeeds.push(auxOpenNeed[0])
      }
    }

    // addresses the case when a need exists but still has no fulfillments:
    // compares the total user's open needs with the ones that have fulfillments;
    // needs that have no fulfillment will make he final auxUserOpenNeeds array;
    // this array will then be merged with the auxOpenNeeeds and finally set a new UserOpenNeeds state
    let auxUserOpenNeeds = this.state.userOpenNeeds

    for(let k=0; k<auxOpenNeeds.length; k++) {
      for(let l=0; l<auxUserOpenNeeds.length; l++) {
        if(auxOpenNeeds[k].id === auxUserOpenNeeds[l].id){
          auxUserOpenNeeds.splice(l,1)
        }
      }
      console.log(auxUserOpenNeeds) 
    }

    // adds republish entry before pushing to auxOpenNeeds
    for(let i=0; i<auxUserOpenNeeds.length; i++){
      auxUserOpenNeeds[i].republish = false
      auxOpenNeeds.push(auxUserOpenNeeds[i])
    }
  
    console.log(auxOpenNeeds)

    //sets the array with all needs including a republish status as the userOpenNeeds state;
    //userOpenNeeds will be used to build the cards no the request column of the page MyHelpOuts
    this.setState({
      userOpenNeeds: auxOpenNeeds
    })

    this.getUserFulfillments()
  }
  
  // fetches all user's fulfillments
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
      console.log("Error getting the user created help requests", error)
    })

    this.getUserFulfillmentsDetails()
  }

  getUserFulfillmentsDetails() {

    let auxUserFN = []
    
    for (let i=0; i<this.props.needs.length; i++) {
      for (let j=0; j<this.state.userFulfillments.length; j++ ) {
        if(this.props.needs[i].id === this.state.userFulfillments[j].needID) {
          let auxBuild = {}
          auxBuild = JSON.parse(JSON.stringify(this.props.needs[i]));
          auxBuild.fulfillmentID = this.state.userFulfillments[j].id;
          auxUserFN.push(auxBuild);
          // console.log("i = " + i, "j = " + j, "fulfillmentID = " + this.state.userFulfillments[j].id,
          //  auxUserFN[j], auxUserFN[j].fulfillmentID)
          
        }
      }
    }

    console.log(auxUserFN)
    this.setState({
      userFulfillmentsDetails: auxUserFN
    })
  }


  render(){

    let userNeeds = this.state.userOpenNeeds.map( need => {
                      return(
                        <UserNeedCard
                          key={need.id}
                          data={need}
                          fulfillments={this.state.needFulfillments}
                          getUserNeeds={this.getUserNeeds}
                        />
                      )
                    })
    
    let showFulfillments = this.state.userFulfillmentsDetails.filter(fulfill => fulfill.status === "open")

    let userFulfillments = showFulfillments.map( need => {
                            return(
                              <UserFulfillmentCard
                                key={need.fulfillmentID}
                                data={need}
                                getUserNeeds={this.getUserNeeds}
                              />
                            )
                          })
    

    return(
      <div className="container-fluid">
      <div className="row mt-2">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
          <h5 className="text-center">Requests</h5>
          {userNeeds}
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <h5 className="text-center">Fulfillments</h5>
         {userFulfillments}
        </div>
      </div>
      </div>
    )
  }
} 

UsersNeedList.propTypes = {
  fetchNeeds: PropTypes.func.isRequired,
  needs: PropTypes.array.isRequired,
  newNeed: PropTypes.object
  }

const mapStateToProps = state => ({
  needs: state.needs.items,
  newNeed: state.needs.item.data
});

export default connect(mapStateToProps, { fetchNeeds }) (UsersNeedList)