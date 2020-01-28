import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import Modal from '../general/modal/Modal'
import Registration from '../auth/Registration'
import Login from '../auth/Login'

class AuthButtons extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      contentModal: ''
    }

    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalContentSignUp = this.handleModalContentSignUp.bind(this);
    this.handleModalContentSignIn = this.handleModalContentSignIn.bind(this);
    this.handleModalSignIn = this.handleModalSignIn.bind(this);
    this.handleModalSignUp = this.handleModalSignUp.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  // Modal methods
  
  handleModalShow(){
    this.setState({
      showModal: true
    })
  };

  handleModalContentSignUp(){
    this.setState({
      contentModal: 'Registration'
    }) 
  }

  handleModalContentSignIn(){
    this.setState({
      contentModal: 'Login'
    }) 
  }

  handleModalSignUp() {
    this.handleModalShow();
    this.handleModalContentSignUp();
  }

  handleModalSignIn() {
    this.handleModalShow();
    this.handleModalContentSignIn();
  }

  handleModalClose() {
    this.setState({
      showModal: false
    })
  }
  
  render(){

    // Conditional statement for modal
    let modalblock  
    
    if (this.state.showModal === true) {
      if (this.state.contentModal === 'Registration') {
        modalblock =
          <Modal
            content=
              {<Registration
              handleLogin={this.props.handleLogin}
              handleModalClose={this.handleModalClose}
              />}
          />
      }
      if (this.state.contentModal === 'Login') {
        modalblock =
          <Modal
            content=
              {<Login
              handleLogin={this.props.handleLogin}
              handleModalClose={this.handleModalClose}
              />}
          />
      }
    } else {
      modalblock = null
    }

    return(
      <div>

      {modalblock}

      <div className="d-flex justify-content-center align-items-center">
        <button className="btn btn-lg btn-primary m-4" onClick={this.handleModalSignIn}>Sign In</button>
        <button className="btn btn-lg btn-primary m-4" onClick={this.handleModalSignUp}>Sign Up</button> 
      </div>

      </div>
    )
  }
  
}

export default AuthButtons
