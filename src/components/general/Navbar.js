import React, { Component, Fragment } from 'react'
import {NavLink} from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { HashLink as Link } from 'react-router-hash-link'
import Modal from '../general/modal/Modal'
import Registration from '../auth/Registration'


class Navbar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      modalContent: ''
    }

    // this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.handleModalShow = this.handleModalShow.bind(this)
    this.handleModalContentSignUp = this.handleModalContentSignUp.bind(this)
    this.handleModal = this.handleModal.bind(this)
  }

  // handleSuccessfulAuth(data) {
  //   this.props.handleLogin(data)
  //   this.props.history.push("/dashboard")
  // }

  // Auth methods
  handleLogoutClick(){
    let url = 'http://localhost:3001/logout'
    
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
      console.log('passou')
    };
  
    handleModalContentSignUp(){
      this.setState({
        modalContent: 'signup'
      })
    }

    handleModal() {
      this.handleModalShow();
      this.handleModalContentSignUp()
    }
  
  render () {
    
    // Conditional statement for buttons
    console.log(this.props.loggedInStatus)
    const isLoggedIn = this.props.loggedInStatus
    let navblock
      
    if (isLoggedIn === 'LOGGED_IN') {
      navblock = 
        <div className="navbar-nav">
          <div className={`nav-item nav-link ${this.props.textColor} ml-xl-2 ml-lg-2 p-2`}> Hello, {this.props.user.firstName}</div>
          <button className="nav-item nav-link btn btn-danger text-white ml-xl-2 ml-lg-2 p-2" onClick={this.handleLogoutClick}>Logout</button>
        </div> } else {
      navblock = 
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link btn btn-warning text-dark ml-xl-2 ml-lg-2 p-2" to="/signin">Sign In</NavLink>
            <div className="nav-item nav-link btn btn-warning text-dark ml-xl-2 ml-lg-2 p-2" onClick={this.handleModal}>Sign Up</div>
          </div>
      }

    // Conditional statement for modal
    let modalblock  
    
    if (this.state.showModal === true && this.state.modalContent === 'signup') {
      modalblock =
    <Modal content={<Registration handleLogin={this.props.handleLogin}/>}  />
    } else {
      modalblock = null
    }

    return (
      
      <div>
      <Fragment>
        {modalblock}
      </Fragment>

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