import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchNeeds} from '../actions/needsAction'
import Map from '../general/map/Map'
import { Link } from 'react-router-dom'


class NeedDetail extends Component {
  constructor(props){
    super(props)

    this.objPosition = this.props.match.params.id - 1 
    this.handleFulfill = this.handleFulfill.bind(this)
  }

  async componentDidMount(){
    await this.props.fetchNeeds();
  }

  handleFulfill(event) {
    event.preventDefault();

    const url = 'http://localhost:3001/api/v1/fulfillments';
    const data = {needID: this.props.match.params.id}
    
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    
    .then((response)=>{
      return response.json()
    })
    .then((data) =>{
      console.log(data)
    })    
    .catch(error => {
      console.log("Error", error)
    })
  }

  render(){
    
  
  console.log(this.props.needs[this.objPosition] ? this.props.needs[this.objPosition].lat : "fail!")
     // why do I need the ternary condition to avoid getting 'cannot read prop of undefined?
    return(
      <div className="container-fluid">
        <div className="row d-flex flex-column flex-fill justify-content-center align-items-center" style={{height: 'calc(100vh - 56px)'}}>

        

      
      <div className="card bg-light col-xl-6 col-lg-10 col-md-11 col-sm-11 col-11">
      <div className="card-body">
        <div className="row">
          <div className="col-xl-10 col-lg-10 col-md-9 col-sm-9 col-9">
          <h5 className="card-title">{this.props.needs[this.objPosition] ? this.props.needs[this.objPosition].title : 'loading'}</h5>
          <p className="card-text">{this.props.needs[this.objPosition] ? this.props.needs[this.objPosition].description : 'loading'}</p>
          <p className="card-text">{this.props.needs[this.objPosition] ? this.props.needs[this.objPosition].formattedAddress : 'loading'}</p>
          </div>
          <div className="col d-flex flex-column justify-content-around aling-items-center">
            
            <Link to="/dashboard" className="btn btn-warning">Back</Link>

            <button className="btn btn-primary" onClick={this.handleFulfill}>Fulfill</button>
          </div>
          
        </div>
        <div className="d-flex justify-content-between">
          <div><span className="pr-2">Type:</span>{this.props.needs[this.objPosition] ? this.props.needs[this.objPosition].needType : 'loading'}</div>
          <div><span className="pr-2">Status:</span>{this.props.needs[this.objPosition] ? this.props.needs[this.objPosition].status : 'loading'}</div>
        </div>
      </div>
      <div className="pb-3">
      <Map
        id = "mapDashboard"
        style={{height: '60vh'}}
        options = {{
          center: {
            lat: this.props.needs[this.objPosition] ? this.props.needs[this.objPosition].lat : null,
            lng: this.props.needs[this.objPosition] ? this.props.needs[this.objPosition].lng : null
            },
            zoom: 14
        }}
        userMarker={this.props.userMarker}
        currentNeed={
          {
          lat: this.props.needs[this.objPosition] ? this.props.needs[this.objPosition].lat : null,
          lng: this.props.needs[this.objPosition] ? this.props.needs[this.objPosition].lng : null
          }
        }
      />
      </div>
      </div>
      </div>
      </div>
      
    )
  }
}

NeedDetail.propTypes = {
  fetchNeeds: PropTypes.func.isRequired,
  needs: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  needs: state.needs.items
});

export default connect(mapStateToProps, { fetchNeeds })(NeedDetail)