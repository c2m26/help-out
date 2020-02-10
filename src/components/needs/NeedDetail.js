import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchNeeds} from '../actions/needsAction'
import Map from '../general/map/Map'


class NeedDetail extends Component {
  constructor(props){
    super(props)

    this.objPosition = this.props.match.params.id - 1  
  }

  async componentDidMount(){
    await this.props.fetchNeeds();
  }

  render(){
    
  
  console.log(this.props.needs[this.objPosition] ? this.props.needs[this.objPosition].lat : "fail!")
     // why do I need the ternary condition to avoid getting 'cannot read prop of undefined?
    return(
      <div className="container-fluid">
        <div className="row d-flex flex-column flex-fill justify-content-center align-items-center" style={{height: 'calc(100vh - 56px)'}}>

        

      
      <div className="card bg-light col-xl-9 col-lg-9 col-md-10 col-sm-11 col-12">
      <div className="card-body">
        <h5 className="card-title">{this.props.needs[this.objPosition] ? this.props.needs[this.objPosition].title : 'loading'}</h5>
        <p className="card-text">{this.props.needs[this.objPosition] ? this.props.needs[this.objPosition].description : 'loading'}</p>
        <p className="card-text">{this.props.needs[this.objPosition] ? this.props.needs[this.objPosition].formattedAddress : 'loading'}</p>
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
            zoom: 14.5
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