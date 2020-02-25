import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class UserNeedCard extends Component {
  constructor(props){
    super(props)

    this.handleMouseOver=this.handleMouseOver.bind(this)
    
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

render(){
  return(
  
  
  <div id={this.props.data.id+"R"} className="card mb-4" data-toggle="collapse" href={`#collapseNeedCard${this.props.data.id}`} role="button" aria-expanded="false">
    <div className="card-body">
      <h5 className="card-title">{this.props.data.title}</h5>
      <p className="card-text">{this.props.data.formattedAddress}</p>
      <div className="d-flex justify-content-between">
        <div><span className="pr-2">Type:</span>{this.props.data.needType}</div>
        <div><span className="pr-2">Status:</span>{this.props.data.status}</div>
      </div>
    </div>
    
    <div className="collapse" id={`collapseNeedCard${this.props.data.id}`}>
      <div className="card-body">
        <div>Helpers</div>
        <div className="d-flex justify-content-around">
          <Link to= {`/helpNeed/${this.props.data.id}`} className="btn btn-success">Helper 1</Link>
          <div className="btn btn-success">Helper 2</div>
          <div className="btn btn-success">Helper 3</div>
          <div className="btn btn-success">Helper 4</div>
          <div className="btn btn-success">Helper 5</div>
        </div>
      </div>
    </div>

  </div>
  
  // <Link className="text-reset" to= {`/helpNeed/${this.props.data.id}`}>
  
  )
}

} export default UserNeedCard