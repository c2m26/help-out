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
        creatorID: data.creatorID,
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
      })
    } else {
      this.props.history.push("/")
    }
  }


render () {
  return(
    <div className="container-fluid d-flex flex-column justify-content-center" style={{height: 'calc(100vh - 58px)'}}>
      <div className="d-flex flex-column flex-fill justify-content-center align-items-center " >
        <div className="col-xl-6 col-lg-10 col-md-11 col-sm-11 col-11 ">
          <div className="card bg-light ">
            <div className="card-body">
              <h5 className="card-title">Title</h5>
              <p className="card-text">Description</p>
              <p className="card-text">Address</p>
            </div>
          </div>  
          <div className="my-3 overflow-auto">
          <Conversation
            creatorID={this.state.creatorID}
            helperID={this.state.helperID}
            user={this.props.user}
          />
          </div>
          
        </div>
        
      </div>
    </div>
  )
}


} export default Fulfillment