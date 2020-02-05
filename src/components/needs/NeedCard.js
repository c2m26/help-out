import React, { Fragment } from 'react'
import {Link, BrowserRouter, Switch, Route} from 'react-router-dom'
import NeedDetail from './NeedDetail'

function NeedCard (props) {
  
  
  return(
    <Fragment>
    <Link to= {`/needs/${props.id}`}>
    
    <div className="card bg-light mb-2">
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.formattedAddress}</p>
        <div className="d-flex justify-content-between">
          <div><span className="pr-2">Type:</span>{props.needType}</div>
          <div><span className="pr-2">Status:</span>{props.status}</div>
        </div>
      </div>
    </div>
    </Link>

      
      <Route
        path = {`/needs/${props.id}`}
        component = {NeedDetail}
       //  render = {props => (
      //    <NeedDetail {...props}
      //    props={props} />
      //  )}
      />
      
      </Fragment>
    

    
  )

} export default NeedCard