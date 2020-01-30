import React, { Component, Fragment } from 'react'
import {NavLink} from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { HashLink as Link } from 'react-router-hash-link'

import Registration from '../auth/Registration'
import Login from '../auth/Login'
import Modal from './modal/Modal'
import NewNeed from '../needs/NewNeed'


class Navbar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      contentModal: ''
    }

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalContentSignUp = this.handleModalContentSignUp.bind(this);
    this.handleModalContentSignIn = this.handleModalContentSignIn.bind(this);
    this.handleModalContentNewHelp = this.handleModalContentNewHelp.bind(this);
    this.handleModalNewHelp = this.handleModalNewHelp.bind(this);
    this.handleModalSignIn = this.handleModalSignIn.bind(this);
    this.handleModalSignUp = this.handleModalSignUp.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);

  }

  // Auth methods
  handleLogoutClick(){
    let url = 'http://localhost:3001/api/v1/logout'
    
    fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      this.props.handleLogout(response)
    })
    .catch (error => {
      console.log("logout error", error)
    })
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

    handleModalContentNewHelp(){
      this.setState({
        contentModal: 'NewHelp'
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

    handleModalNewHelp() {
      this.handleModalShow();
      this.handleModalContentNewHelp();
    }

    handleModalClose() {
      this.setState({
        showModal: false
      })
    }
  

  render () {
    
    // Conditional statement for buttons
    
    let navblock
      
    if (this.props.loggedInStatus === 'LOGGED_IN') {
      navblock = 
        <Fragment>
          <button className="btn btn-primary text-white mr-3" onClick={this.handleModalNewHelp}>New HelpOut</button>
          <div className="dropdown">
            <button className="btn btn-light text-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Hello {this.props.user.firstName}
            </button>
            <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="#">My HelpOuts</a>
            <button className="dropdown-item" onClick={this.handleLogoutClick}>Logout</button>
            </div>
          </div>
          
          {/* <div className={`nav-item nav-link ${this.props.textColor} ml-xl-2 ml-lg-2 p-2`}> Hello, {this.props.user.firstName}</div> */}
          {/* <button className="nav-item nav-link btn btn-danger text-white ml-xl-2 ml-lg-2 p-2" onClick={this.handleLogoutClick}>Logout</button> */}
        </Fragment> } else {
      navblock = 
        <Fragment>
          <div className="nav-item nav-link btn btn-warning text-dark ml-xl-2 ml-lg-2 p-2" onClick={this.handleModalSignIn}>Sign In</div>
          <div className="nav-item nav-link btn btn-warning text-dark ml-xl-2 ml-lg-2 p-2" onClick={this.handleModalSignUp}>Sign Up</div>
        </Fragment>
      }

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
      if (this.state.contentModal === 'NewHelp') {
        modalblock =
          <Modal
            content=
              {<NewNeed
              user={this.props.user}
              handleLogin={this.props.handleLogin}
              handleModalClose={this.handleModalClose}
              />}
          />
      }
    } else {
      modalblock = null
    }
    
     
  
    return (
      
      <div>

        {modalblock}
        
      {/* <Modal content={this.state.contentModal} show={this.state.showModal} handleLogin={this.props.handleLogin}/> */}

      <nav className={`navbar navbar-expand-lg sticky-top ${this.props.navcolorscheme} ${this.props.navbg}`}>
        <NavLink className="navbar-brand" to="/">HelpOut</NavLink>
        {/* <div className="d-flex flex-fill justify-content-start align-items-center">
        <a id="icon-color" className="nav-item nav-link" href="http://youtube.com" target="_blank"><FontAwesomeIcon icon={['fab','youtube']}/></a>
        <a id="icon-color" className="nav-item nav-link" href="http://instagram.com" target="_blank"><FontAwesomeIcon icon={['fab','instagram']}/></a>
        <a id="icon-color" className="nav-item nav-link" href="http://twitter.com" target="_blank"><FontAwesomeIcon icon={['fab','twitter']}/></a>
        </div> */}
  
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {navblock}
          </div>
            
        </div>
      </nav>
      </div>
    )
  } 
}

export default Navbar