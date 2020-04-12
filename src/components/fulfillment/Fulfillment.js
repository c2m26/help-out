import React, { Component } from 'react'
import Conversation from './Conversation'
import {backendURL} from '../APIendpoints'

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
  }

  async getFulfillmentforeignKeys() {
    
    const fulfillmentID = this.props.match.params.id
    const url = `${backendURL}/api/v1/fulfillments/get_foreignKeys?id=${fulfillmentID}`;
    
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
    
    const url = `${backendURL}/api/v1/needs/get_creatorID?id=${this.state.needID}`;
    
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
        creatorID: data,
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
      });
      this.getNeed();
    } else {
      this.props.history.push("/")
    }
  }

  async getNeed(){

    const url = `${backendURL}/api/v1/needs/get_Need?id=${this.state.needID}`;
    
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
        need: data,
      })
    })    
    .catch(error => {
      console.log("Error getting need data", error)
    })
    this.getUsersName()
  }

  async getUsersName(){
    
    const url = `${backendURL}/api/v1/users/${this.state.creatorID}`;
    
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
        creatorName: data.firstName,
      })
    })    
    .catch(error => {
      console.log("Error getting need creator name", error)
    })

    const url1 = `${backendURL}/api/v1/users/${this.state.helperID}`;
    
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
      this.setState({
        helperName: data.firstName,
      })
    })    
    .catch(error => {
      console.log("Error getting need creator name", error)
    })
  }

  render () {

    return(
      <div data-testid="need" className="d-flex flex-column align-items-center p-1" style={{height: 'calc(100vh - 58px)'}}>
        <div className="d-flex flex-column flex-grow-1 col-xl-6 col-lg-10 col-md-11 col-sm-12 col-12 px-0" style={{overflow: 'scroll'}}>
          <div className="card shadow-sm">
            <div className="card-body p-3 d-flex flex-column">
              <h5 className="card-title">{this.state.need.title}</h5>
              <p className="card-text mb-1">{this.state.need.description}</p>
              <small className="card-text">{this.state.need.formattedAddress}</small>
            </div>
          </div>  
          <div data-testid="conversation" className="d-flex flex-column flex-grow-1 mt-2" style={{overflow: 'scroll'}}>
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
} 
export default Fulfillment