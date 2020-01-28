import React, { Component } from 'react'
import NewNeed from '../needs/NewNeed'
import Registration from '../auth/Registration'


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
            <NewNeed user={this.props.user}/>
    
            
          </div>
        </div>
  
        
      </div>
    )
  }
  
}

export default Dashboard