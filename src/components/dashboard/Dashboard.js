import React, { Component } from 'react'
import MapFrame from '../general/map/MapFrame'

import NeedsList from '../needs/NeedsList'

class Dashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      needs: []
    }
  }
  

  componentDidMount() {
    
    // fetching all needs from API
    let urlneeds = 'http://localhost:3001/api/v1/needs'

    fetch(urlneeds, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{
      return response.json()
    })
    .then((data) =>{
      console.log(data)
      this.setState({
        needs: data
      })
    })    
    .catch(error => {
      console.log("Log In error", error)
    })
  }
  
  
  render () {
    
    return (
      <div className="container-fluid">

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <NeedsList needs={this.state.needs} />
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