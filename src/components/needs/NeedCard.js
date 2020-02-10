import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class NeedCard extends Component {
  constructor(props){
    super(props)

    this.state ={
      bgColor: ""
    }

    this.handleMouseOver=this.handleMouseOver.bind(this)
    this.handleCardId=this.handleCardId.bind(this)
    this.handleRemoveMarker=this.handleRemoveMarker.bind(this)
  }
  
  componentDidMount(){
    this.handleMouseOver()
  }
  
  handleMouseOver() {
    const card = document.getElementById(this.props.needs.id)
    var self = this

    card.addEventListener("mouseover", 
      function () {
        card.classList.add("bg-info")
        self.handleCardId()
      }
    )

    card.addEventListener("mouseout", 
      function () {
        card.classList.remove("bg-info")
        self.handleRemoveMarker()
      }
    )
  }

  handleCardId() {
    this.props.handleShowHighlight(this.props.needs.id)
  }

  handleRemoveMarker() {
    this.props.handleRemoveHighlight()
  }


render(){
  return(
  <Link className="text-reset" to= {`/helpNeed/${this.props.needs.id}`}>
  
  <div onMouseEnter={this.handleMouseOver} id={this.props.needs.id} className="card mb-2">
    <div className="card-body">
      <h5 className="card-title">{this.props.needs.title}</h5>
      <p className="card-text">{this.props.needs.formattedAddress}</p>
      <div className="d-flex justify-content-between">
        <div><span className="pr-2">Type:</span>{this.props.needs.needType}</div>
        <div><span className="pr-2">Status:</span>{this.props.needs.status}</div>
      </div>
    </div>
  </div>
  </Link>
  )
}

} export default NeedCard