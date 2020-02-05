import React from 'react'
// import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Map from '../general/map/Map'

function NeedDetail (props) {

  // const NeedContent = (
  //   <div className="card bg-light">
  //     <div className="card-img-top">
  //       <Map/>
  //     </div>
  //     <div className="card-body">
  //       <h5 className="card-title">{props.title}</h5>
  //       <p className="card-text">{props.description}</p>
  //       <p className="card-text">{props.formattedAddress}</p>
  //       <div className="d-flex justify-content-between">
  //         <div><span className="pr-2">Type:</span>{props.needType}</div>
  //         <div><span className="pr-2">Status:</span>{props.status}</div>
  //       </div>
  //     </div>
  //   </div>
  //   )

    return(
      // <BrowserRouter>
      // <Switch>
      // <Route
      //   path = {`/needs/${props.id}`}
      //   component = {NeedContent}
      //   />
      // </Switch>
        
      // </BrowserRouter>

      <div className="card bg-light">
      <div className="card-img-top">
        {/* <Map/> */}
        Teste
      </div>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
        <p className="card-text">{props.formattedAddress}</p>
        <div className="d-flex justify-content-between">
          <div><span className="pr-2">Type:</span>{props.needType}</div>
          <div><span className="pr-2">Status:</span>{props.status}</div>
        </div>
      </div>
    </div>
    )
  


} export default NeedDetail