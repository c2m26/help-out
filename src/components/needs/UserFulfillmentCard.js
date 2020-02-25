import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class UserFulfillmentCard extends Component {
  constructor(props){
    super(props)

    this.handleMouseOver=this.handleMouseOver.bind(this)
    
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

render(){
  return(
  <Link className="text-reset" to= {`/fulfillment/${this.props.data.fulfillmentID}`}>
  
  <div id={this.props.data.fulfillmentID+"F"} className="card mb-4">
    <div className="card-body">
      <h5 className="card-title">{this.props.data.title}</h5>
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