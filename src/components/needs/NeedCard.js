import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class NeedCard extends Component {
  constructor(props){
    super(props)

    this.handleMouseOver=this.handleMouseOver.bind(this)
    this.handleCardId=this.handleCardId.bind(this)
    this.handleRemoveMarker=this.handleRemoveMarker.bind(this)
  }
  
  componentDidMount(){
    this.handleMouseOver()
  }
  
  handleMouseOver() {
    const card = document.getElementById(this.props.need.id)
    var self = this

    card.addEventListener("mouseenter", 
      function () {
        card.classList.add("shadow")
        card.classList.add("bg-light")
        self.handleCardId()
      }
    )

    card.addEventListener("mouseleave", 
      function () {
        card.classList.remove("shadow")
        card.classList.remove("bg-light")
        self.handleRemoveMarker()
      }
    )
  }

  handleCardId() {
    this.props.buildNeedsArrays(this.props.need.id)
  }

  handleRemoveMarker() {
    this.props.handleRemoveHighlight(false)
  }


render(){

  let needType
  if(this.props.need.needType === "material"){
    needType = <div className="badge badge-pill badge-danger">material</div>
  } else {
    needType = <div className="badge badge-pill badge-warning">one time</div>
  }

  return(
  <Link className="text-reset" to= {`/helpNeed/${this.props.need.id}`}>
  <div id={this.props.need.id} className="card mb-4">
    <div className="card-body">
      <h5 className="card-title">{this.props.need.title}</h5>
      <p className="card-text">{this.props.need.formattedAddress}</p>
      {needType}
    </div>
  </div>
  </Link>
  )
}

} export default NeedCard