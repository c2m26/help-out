import React, { Component } from 'react'
import Conversation from './Conversation'

class Fulfillment extends Component {
  constructor(props){
    super(props)

    this.state = {
      creatorID: null,
      creatorName: null,
      helperID: null,
      helperName: null,
      needID: null,
      need: {},
      allowAcess: false
    }

    this.getFulfillmentforeignKeys = this.getFulfillmentforeignKeys.bind(this)
    this.getNeedCreatorId = this.getNeedCreatorId.bind(this)
    this.checkUserAccess = this.checkUserAccess.bind(this)
    this.getNeed = this.getNeed.bind(this)
    this.getUsersName = this.getUsersName.bind(this)
  }

  componentDidMount() {
    this.getFulfillmentforeignKeys();
    this.getNeed()
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
        creatorID: data,
      })
    })    
    .catch(error => {
      console.log("Error getting help need creator ID", error)
    })
    
    this.checkUserAccess()
  }

  checkUserAccess() {
    console.log(this.props.user)
    if (this.props.user.id === this.state.creatorID || this.props.user.id === this.state.helperID) {
      this.setState({
        allowAcess: true
      });
      this.getNeed();
    } else {
      this.props.history.push("/")
    }
  }

  async getNeed(){

    const url = `http://localhost:3001/api/v1/needs/get_Need?id=${this.state.needID}`;
    
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
      // console.log(data);
      this.setState({
        need: data,
      })
    })    
    .catch(error => {
      console.log("Error getting need data", error)
    })

    this.getUsersName()
  }

  async getUsersName(){
    
    const url = `http://localhost:3001/api/v1/users/${this.state.creatorID}`;
    
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
        creatorName: data.firstName,
      })
    })    
    .catch(error => {
      console.log("Error getting need creator name", error)
    })

    const url1 = `http://localhost:3001/api/v1/users/${this.state.helperID}`;
    
    await fetch(url1, {
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
        helperName: data.firstName,
      })
    })    
    .catch(error => {
      console.log("Error getting need creator name", error)
    })
  }

render () {

  // let dateISO = this.state.need.created_at
  // let date = String(dateISO).split("T")[0]

  return(
    <div data-testid="need" className="d-flex justify-content-center py-1" style={{height: 'calc(100vh - 58px)'}}>
      <div className="d-flex flex-column col-xl-6 col-lg-10 col-md-11 col-sm-12 col-12 ">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{this.state.need.title}</h5>
            <p className="card-text">{this.state.need.description}</p>
            <small className="card-text">{this.state.need.formattedAddress}</small>
          </div>
        </div>  
        <div data-testid="conversation" className="d-flex flex-column flex-fill mt-2">
          <Conversation
            creatorID={this.state.creatorID}
            helperID={this.state.helperID}
            creatorName={this.state.creatorName}
            helperName={this.state.helperName}
            user={this.props.user}
          />
        </div>
        
      </div>
        
    </div>
  )
}


} export default Fulfillment