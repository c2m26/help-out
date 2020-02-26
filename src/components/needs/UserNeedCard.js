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
  let republishButton
  if(this.props.data.republish === true ) {
    republishButton = <div className="btn btn-primary">Republish</div>
  }

  return(
  
  
  <div id={this.props.data.id+"R"} className="card mb-4" data-toggle="collapse" href={`#collapseNeedCard${this.props.data.id}`} role="button" aria-expanded="false">
    <div className="card-body">
      <div className="row">
        <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">
          <h5 className="card-title">{this.props.data.title}</h5>
        </div>
        <div className="col d-flex justify-content-end">
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

} export default UserNeedCard