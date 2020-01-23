import React, { Component } from 'react'
import ReactDom from 'react-dom'
import {withRouter} from 'react-router-dom'
import '../../auth/Registration'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import './Modal.css'
import ModalTemplate from './ModalTemplate'


class Modal extends Component {
  constructor(props){
    super(props)

    // this.state = {
    //   contentModal: 'none'
    // }
  }
  
  //Modal methods

  // handleContentModal(data){
  //   this.setState({
  //     contentModal: data
  //   })
  //   console.log(this.state.contentModal)
  //   console.log(data)
  // }
  
  render () {
    
    //conditional rendering for Modal content
    let slot
    
    // if(this.props.contentModal === "signup") {
      
      slot=  
        <ModalTemplate >
          {this.props.content}
        </ModalTemplate>
      
    // } else {
    //   content = null
    // }
    
    return(
      ReactDom.createPortal(
        slot
        ,document.querySelector("#modal")
      )
    )
  }

} export default withRouter(Modal)