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
      userFulfillments: [],
      userFulfillmentsDetails: []
    }

    this.getUserNeeds = this.getUserNeeds.bind(this)
    this.getUserFulfillments = this.getUserFulfillments.bind(this)
    this.getUserFulfillmentsDetails = this.getUserFulfillmentsDetails.bind(this)
  }

  componentDidMount() {
    this.props.fetchNeeds()
    this.getUserNeeds()
  }

  async getUserNeeds() {
    
    const url = `http://localhost:3001/api/v1/needs/get_userNeeds?id=${this.props.user.id}`;
    
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
        userNeeds: data.data
      })
    })    
    .catch(error => {
      console.log("Error getting the user created help need requests", error)
    })
    
    this.getUserFulfillments()
  }

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

    let userNeeds = this.state.userNeeds.map( need => {
                      return(
                        <UserNeedCard
                          key={need.id}
                          data={need}
                        />
                      )
                    })

    let userFulfillments = this.state.userFulfillmentsDetails.map( need => {
                            return(
                              <UserFulfillmentCard
                                key={need.fulfillmentID}
                                data={need}
                              />
                            )
                          })
    

    return(
      <div className="container-fluid">
      <div className="row">
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
  needs: PropTypes.array.isRequired
  }

const mapStateToProps = state => ({
  needs: state.needs.items,
});

export default connect(mapStateToProps, { fetchNeeds }) (UsersNeedList)