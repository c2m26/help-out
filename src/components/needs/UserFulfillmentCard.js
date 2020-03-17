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

    this.props.getUserNeeds()
  }

render(){

  let needType
  if(this.props.data.needType === "material"){
    needType = <div className="badge badge-pill badge-danger">material</div>
  } else {
    needType = <div className="badge badge-pill badge-warning">one time</div>
  }

  return(
  <Link className="text-reset text-decoration-none" to= {`/fulfillment/${this.props.data.fulfillmentID}`}>
  
  <div id={this.props.data.fulfillmentID+"F"} className="card mb-3">
    <div className="card-body">
      <div className="card-title row">
        <div className="col-xl-10 col-lg-9 col-md-8 col-sm-8 col-8 d-flex align-items-center">
          <h5>{this.props.data.title}</h5>
        </div>
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-4 d-flex justify-content-center">
          <div className="btn btn-success m-2" onClick={this.handleFulfilled}>Fulfilled</div>
        </div>
      </div>
      <p className="card-text">{this.props.data.formattedAddress}</p>
      <div className="d-flex justify-content-between">
        {needType}
      </div>
    </div>
  </div>
  </Link>
  )
}

} export default UserFulfillmentCard