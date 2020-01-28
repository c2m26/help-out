import React, { Component } from 'react'
import ReactDom from 'react-dom'
import {withRouter} from 'react-router-dom'
import '../../auth/Registration'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import './Modal.css'
import Backdrop from './Backdrop'
import Registration from '../../auth/Registration'


class Modal extends Component {
  constructor(props){
    super(props)
      
  }
   
  render () {
      
    const slot =
    
    <div className="modal-frame d-flex justify-content-center align-items-center">
      
      <Backdrop/>

      <div className="card p-4">
        {this.props.content}
      </div>

    </div>
  

  return(
    ReactDom.createPortal(
      slot
      ,document.querySelector("#modal")
    )
  )
}
   

} export default withRouter(Modal)