import React, { Component, Fragment } from 'react'
import ReactDom from 'react-dom'
import '../../auth/Registration'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import './Modal.css'
import Backdrop from './Backdrop'


class Modal extends Component {
  
  render () {

    return (
      ReactDom.createPortal(
           <div className="modal-frame d-flex justify-content-center align-items-center">
             
              <Backdrop/>

              <div className="card p-4">
                {this.props.content}
              </div>
              
           </div>

        ,document.querySelector("#modal")
      ) 
    )
  }

} export default Modal