import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class NeedCard extends Component {
  constructor(props){
    super(props)

    this.state ={
      bgColor: ""
    }

    this.handleMouseOver=this.handleMouseOver.bind(this)
  }
  
  componentDidMount(){
    this.handleMouseOver()
  }
  
  handleMouseOver() {
    const card = document.getElementById(this.props.id)

    card.addEventListener("mouseover", 
      function () {
        card.classList.add("bg-info")
      }
    )

    card.addEventListener("mouseout", 
      function () {
        card.classList.remove("bg-info")
      }
    )
  }

render(){
  return(
  <Link to= {`/needs/${this.props.id}`}>
  
  <div onMouseEnter={this.handleMouseOver} id={this.props.id} className="card mb-2">
    <div className="card-body">
      <h5 className="card-title">{this.props.title}</h5>
      <p className="card-text">{this.props.formattedAddress}</p>
      <div className="d-flex justify-content-between">
        <div><span className="pr-2">Type:</span>{this.props.needType}</div>
        <div><span className="pr-2">Status:</span>{this.props.status}</div>
      </div>
    </div>
  </div>
  </Link>
  )
}

} export default NeedCard