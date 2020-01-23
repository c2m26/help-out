import React, { Component } from 'react'
// import ReactDom from 'react-dom'
import {withRouter} from 'react-router-dom'
import '../../auth/Registration'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import './Modal.css'
import Backdrop from './Backdrop'


function ModalTemplate (props) {
    
    return (
      
      <div className="modal-frame d-flex justify-content-center align-items-center">
        
        <Backdrop/>

        <div className="card p-4">
          {props.children}
        </div>

      </div> 
  )

} export default withRouter(ModalTemplate)