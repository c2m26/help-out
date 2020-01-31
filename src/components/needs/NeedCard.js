import React from 'react'

function NeedCard (props) {
  
  
  return(
    <div className="card bg-light my-2">
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.formattedAdress}</p>
        <div className="d-flex justify-content-between">
          <div><span className="pr-2">Type:</span>{props.needType}</div>
          <div><span className="pr-2">Status:</span>{props.status}</div>
        </div>
      </div>
    </div>
  )

} export default NeedCard