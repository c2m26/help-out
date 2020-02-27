import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postNeed } from '../actions/needsAction'

class UserNeedCard extends Component {
  constructor(props){
    super(props)

    this.state = {
      needFulfillments: []
    }

    this.handleMouseOver=this.handleMouseOver.bind(this)
    this.handleRepublish = this.handleRepublish.bind(this)
    this.handleFulfilled = this.handleFulfilled.bind(this)
    this.getHelpersID = this.getHelpersID.bind(this)
  }
  
  componentDidMount(){
    this.handleMouseOver()
    
  }

  componentDidUpdate(prevProps) {
    if(this.props.fulfillments !== prevProps.fulfillments) {
      this.getHelpersID()
    }
  }
  
  handleMouseOver() {
    const card = document.getElementById(this.props.data.id+"R")

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

  getHelpersID(){
    let auxFulfillments = []

    console.log(this.props.fulfillments.length)
    for(let i=0; i<this.props.fulfillments.length; i++){
      if(this.props.fulfillments[i].length === 0){
        continue
      } else {
        if(this.props.fulfillments[i][0].needID === this.props.data.id){
          console.log(this.props.fulfillments[i])  
          auxFulfillments = this.props.fulfillments[i]
          console.log(auxFulfillments)
        }
      }
    }
    this.setState({
      needFulfillments: auxFulfillments
    })
  }

  // republishes the Need following the user clock on the button "republish"
  async handleRepublish(event){
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

    // creates a new Need with the same data as the closed one
    let needRepublish = {
      userID: this.props.data.userID,
      title: this.props.data.title,
      description: this.props.data.description,
      needType: this.props.data.needType,
      lat: this.props.data.lat,
      lng: this.props.data.lng,
      formattedAddress: this.props.data.formattedAddress,
      status: 'open'
    }
    
    let urlneeds = 'http://localhost:3001/api/v1/needs'

      fetch(urlneeds, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(needRepublish)
      })
      
      .then((response)=>{
        return response.json()
      })
      .then((response)=>{
        console.log(response)
      })
      .catch(error => {
        console.log("Error republishing need", error)
      })    
  
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
  let republishButton
  if(this.props.data.republish === true ) {
    republishButton = <div className="btn btn-primary" onClick={this.handleRepublish}>Republish</div>
  }
  console.log(this.props.data.status)

  let helpersButtons
  if(typeof this.state.needFulfillments !== "undefined") {
    helpersButtons = this.state.needFulfillments.map( fulfillments => {
      return(
      <Link to= {`/fulfillment/${fulfillments.id}`} className="btn btn-primary m-2">Helper {fulfillments.helperID}</Link>
      )
    })
  }

  return(
  
  
  <div id={this.props.data.id+"R"} className="card mb-4" data-toggle="collapse" href={`#collapseNeedCard${this.props.data.id}`} role="button" aria-expanded="false">
    <div className="card-body">
      <div className="card-title row">
        <div className="col-xl-10 col-lg-10 col-md-10 col-sm-12">
          <h5>{this.props.data.title}</h5>
        </div>
        <div className="col d-flex justify-content-end align-items-start">
          {republishButton}
        </div>
      </div>
      
      <p className="card-text">{this.props.data.formattedAddress}</p>
      <div className="d-flex flex-wrap justify-content-between">
        <div><span className="pr-2">Type:</span>{this.props.data.needType}</div>
        <div><span className="pr-2">Status:</span>{this.props.data.status}</div>
      </div>
    </div>
    
    <div className="collapse" id={`collapseNeedCard${this.props.data.id}`}>
      <div className="card-body">
        <div className="row">
          <div className="d-flex flex-wrap justify-content-around col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
            {helpersButtons}
          </div>
          <div className="col d-flex justify-content-end col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
            <div className="btn btn-success m-2" onClick={this.handleFulfilled}>Fulfilled</div>
          </div>
        </div>
      </div>
    </div>

  </div>
  
  // <Link className="text-reset" to= {`/helpNeed/${this.props.data.id}`}>
  
  )
}

}  

// UserNeedCard.propTypes = {
//   postNeed: PropTypes.func.isRequired,
//   // need: PropTypes.object.isRequired,
// }

// const mapStateToProps = state => ({
//   need: state.needs.item
// })

// export default connect(mapStateToProps,{ postNeed })(UserNeedCard)

export default UserNeedCard