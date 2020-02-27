import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postNeed } from '../actions/needsAction'

class UserNeedCard extends Component {
  constructor(props){
    super(props)

    this.handleMouseOver=this.handleMouseOver.bind(this)
    this.handleRepublish = this.handleRepublish.bind(this)
  }
  
  componentDidMount(){
    this.handleMouseOver()
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

render(){
  let republishButton
  if(this.props.data.republish === true ) {
    republishButton = <div className="btn btn-primary" onClick={this.handleRepublish}>Republish</div>
  }
  console.log(this.props.data.status)

  return(
  
  
  <div id={this.props.data.id+"R"} className="card mb-4" data-toggle="collapse" href={`#collapseNeedCard${this.props.data.id}`} role="button" aria-expanded="false">
    <div className="card-body">
      <div className="card-title row">
        <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9">
          <h5>{this.props.data.title}</h5>
        </div>
        <div className="col-3 d-flex justify-content-end">
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
        <div className="d-flex flex-wrap justify-content-around">
          <Link to= {`/helpNeed/${this.props.data.id}`} className="btn btn-success m-2">Helper 1</Link>
          <div className="btn btn-success m-2">Helper 2</div>
          <div className="btn btn-success m-2">Helper 3</div>
          <div className="btn btn-success m-2">Helper 4</div>
          <div className="btn btn-success m-2">Helper 5</div>
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