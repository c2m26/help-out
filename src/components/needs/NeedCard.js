import React from 'react'
import {Link} from 'react-router-dom'

function NeedCard (props) {
  
  
  return(
    <Link to= {`/needs/${props.id}`}>
    
    <div className="card mb-2">
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
  )

} export default NeedCard