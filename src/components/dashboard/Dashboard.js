import React, { Component } from 'react'
import MapFrame from '../general/map/MapFrame'


class Dashboard extends Component {
  constructor(props){
    super(props)
  }

  render () {
    return (
      <div className="container-fluid">

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            Needs card list
          </div>

          <div className="col">
            <MapFrame/>
    
            
          </div>
        </div>
  
        
      </div>
    )
  }
  
}

export default Dashboard