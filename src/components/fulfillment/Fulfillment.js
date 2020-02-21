import React, { Component } from 'react'
import Conversation from './Conversation'

class Fulfillment extends Component {
  constructor(props){
    super(props)

    this.state = {
      creatorID: null,
      helperID: null,
      needID: null,
      allowAcess: false
    }

    this.getFulfillmentforeignKeys = this.getFulfillmentforeignKeys.bind(this)
    this.getNeedCreatorId = this.getNeedCreatorId.bind(this)
    this.checkUserAccess = this.checkUserAccess.bind(this)
  }

  componentDidMount() {
    this.getFulfillmentforeignKeys()
  }

  async getFulfillmentforeignKeys() {
    
    const fulfillmentID = this.props.match.params.id
    const url = `http://localhost:3001/api/v1/fulfillments/get_foreignKeys?id=${fulfillmentID}`;
    
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
        helperID: data.helperID,
        needID: data.needID
      })
    })    
    .catch(error => {
      console.log("Error getting fulfillment foreignKeys", error)
    })
  
    this.getNeedCreatorId()
  }

  async getNeedCreatorId() {
    
    const url = `http://localhost:3001/api/v1/needs/get_creatorID?id=${this.state.needID}`;
    
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
        creatorID: data.creatorID
      })
    })    
    .catch(error => {
      console.log("Error getting help need creator ID", error)
    })
    
    this.checkUserAccess()
  }

  checkUserAccess() {
    if (this.props.user.id === this.state.creatorID || this.props.user.id === this.state.helperID) {
      this.setState({
        allowAcess: true
      })
    } else {
      this.props.history.push("/")
    }
  }


render () {
  return(
    <div className="row"> 
      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">Details and Map</div>
      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
        <Conversation
          creatorID={this.state.creatorID}
          helperID={this.state.helperID}
          user={this.props.user}
        />
      </div>
    </div>
  )
}


} export default Fulfillment