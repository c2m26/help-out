import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchNeeds} from '../actions/needsAction'
import {getUserLocation} from '../actions/userLocationAction'
import Map from '../general/map/Map'
import NeedsList from '../needs/NeedsList'
import NeedCard from '../needs/NeedCard'
import './Dashboard.css'

class Dashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      needsOT: [],
      needsMT: [],
      needHL: {},
      showMarkers: true
    }
    
    this.handleRemoveHighlight=this.handleRemoveHighlight.bind(this)
    this.buildNeedsArrays = this.buildNeedsArrays.bind(this)
  } 
  
  async componentDidMount() {

      await this.props.getUserLocation();
      await this.props.fetchNeeds();
      await this.buildNeedsArrays();
  }

  buildNeedsArrays(needHighID){
    console.log(needHighID)
    
    let material = []
    let oneTime = []
    let needHighlight = {}
    
    for (let i=0; i<this.props.needs.length; i++) {
      if (this.props.needs[i].needType === 'material') {
        material.push(this.props.needs[i])
      } else {
        oneTime.push(this.props.needs[i])
      }
      console.log("MT & OT arrays built")
    }

    for (let i=0; i<material.length; i++) { 
      if (material[i].id === needHighID) { 
        needHighlight = material[i]
        material.splice(i,1)
        break
      }
    } 
        
    for (let i=0; i<oneTime.length; i++) {
      if (oneTime[i].id === needHighID) {
        needHighlight = oneTime[i]
        oneTime.splice(i,1)
        break
      }
    }

    this.setState({
      needsMT: material,
      needsOT: oneTime,
      needHL: needHighlight,
      showMarkers: true
    })
    console.log(this.state.needHL)
  }

  handleRemoveHighlight(data){
    
    this.setState({
      showMarkers: data
    })
    console.log('passou no remove', data)
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(this.props.newNeed !== prevProps.newNeed) {
      this.props.fetchNeeds()
      this.buildNeedsArrays()
    }
    if(this.state.showMarkers !== prevState.showMarkers) {
      this.buildNeedsArrays()
    }
  }

    
  render () {
    let MapElement
    if(typeof this.props.needs !== "undefined" && typeof this.state.needsOT !== "undefined" && typeof this.state.needsMT !== "undefined" && typeof this.props.userLocation.lng !== "undefined" && typeof this.props.userLocation.lat !== "undefined") {
      console.log("passing in render map")
      MapElement = 
      <Map
        id = "mapDashboard"
        
        options = {{
          center: {lat: this.props.userLocation.lat, lng: this.props.userLocation.lng},
          zoom: 15
        }}
        
        activeMarker={
          {
            lat: this.state.needHL.lat,
            lng: this.state.needHL.lng
          }
        }
        
        MTMarkers={this.state.needsMT}
        OTMarkers={this.state.needsOT}

        showMarkers={this.state.showMarkers}
        
        style={{height: '92vh'}}

        history = {this.props.history}
      />
    } else
    {MapElement = null}

    return (
      
      <div id="viewframe" className="container-fluid">

        <div className="row px-3">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 py-2">
            <NeedsList
              content= {this.props.needs.map(
                needs => {
                  return(
                    <NeedCard
                      key={needs.id} 
                      needs={needs}
                      buildNeedsArrays={this.buildNeedsArrays}
                      handleRemoveHighlight={this.handleRemoveHighlight}
                    />
                  )
                }
              )}
            />
          </div>

          <div className="col py-2">
            {MapElement}
          </div>
        </div>      
      </div>
    )
  }
  
}

Dashboard.propTypes = {
  fetchNeeds: PropTypes.func.isRequired,
  needs: PropTypes.array.isRequired,
  newNeed: PropTypes.object,
  getUserLocation: PropTypes.func.isRequired,
  userLocation: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  needs: state.needs.items,
  newNeed: state.needs.item.data,
  userLocation: state.userCoords
});

export default connect(mapStateToProps, { fetchNeeds, getUserLocation })(Dashboard)