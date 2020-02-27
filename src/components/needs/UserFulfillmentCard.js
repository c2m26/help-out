import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class UserFulfillmentCard extends Component {
  constructor(props){
    super(props)

    this.handleMouseOver=this.handleMouseOver.bind(this)
    this.handleFulfilled = this.handleFulfilled.bind(this)
  }
  
  componentDidMount(){
    this.handleMouseOver()
  }
  
  handleMouseOver() {
    const card = document.getElementById(this.props.data.fulfillmentID+"F")

    card.addEventListener("mouseenter", 
      function () {
        card.classList.add("shadow")
        card.classList.add("bg-light")
      }
    )

    card.addEventListener("mouseleave", 
      function () {
        card.classList.remove("shadow")
        card.classList.remove("bg-light")
      }
    )
  }

  async handleFulfilled(event){
    event.preventDefault();
    
    // updates the need status by sending a patch request to the current need (using its id)
    let id = this.props.data.id
    let status = "closed"
      
    const url = `http://localhost:3001/api/v1/needs/update_status?id=${id}&status=${status}`;
    
    await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{
      return response.json()
    })
    .then((response)=>{
      console.log(response)
    })    
    .catch(error => {
      console.log("Error changing the need status", error)
    })
  }

render(){
  return(
  <Link className="text-reset" to= {`/fulfillment/${this.props.data.fulfillmentID}`}>
  
  <div id={this.props.data.fulfillmentID+"F"} className="card mb-4">
    <div className="card-body">
      <div className="card-title row">
        <div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
          <h5>{this.props.data.title}</h5>
        </div>
        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12 d-flex justify-content-end align-items-start">
          <div className="btn btn-success m-2" onClick={this.handleFulfilled}>Fulfilled</div>
        </div>
      </div>
      <p className="card-text">{this.props.data.formattedAddress}</p>
      <div className="d-flex justify-content-between">
        <div><span className="pr-2">Type:</span>{this.props.data.needType}</div>
        <div><span className="pr-2">Status:</span>{this.props.data.status}</div>
      </div>
    </div>
  </div>
  </Link>
  )
}

} export default UserFulfillmentCard