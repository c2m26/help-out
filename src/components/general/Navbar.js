import React, { Component, Fragment } from 'react'
import {NavLink} from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { HashLink as Link } from 'react-router-hash-link'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom'
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
    });

    this.props.history.push("/")
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
    let navitems
    let navblock
    let authblock

    navitems = 
        <Fragment>
          <button className="btn btn-primary text-white mr-xl-2 mr-lg-2 p-2" onClick={this.handleModalNewHelp}>New HelpOut</button>
          <Link className="nav-item nav-link" to="/dashboard">Open HelpOuts</Link>
          <Link className="nav-item nav-link" to={`/myHelpOuts/${this.props.user.id}`}>My HelpOuts</Link>
          
          <div className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Hi {this.props.user.firstName}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link className="dropdown-item" to={`/user/${this.props.user.id}`}>Profile</Link>
              <a className="dropdown-item" href="#" onClick={this.handleLogoutClick}>Logout</a>
            </div>
          </div>
        </Fragment>
      
    if (this.props.loggedInStatus === 'LOGGED_IN') {
      
      navblock =
        <Fragment>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {navitems}
          </div>
        </div>
        </Fragment>
      } else {
      authblock = 
        <Fragment>
          <div className="btn btn-warning text-dark ml-2 p-2" onClick={this.handleModalSignIn}>Sign In</div>
          <div className="btn btn-warning text-dark ml-2 p-2" onClick={this.handleModalSignUp}>Sign Up</div>
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
  
      <nav className={`navbar navbar-expand-lg sticky-top ${this.props.navcolorscheme} ${this.props.navbg}`}>
        <NavLink className="navbar-brand" to="/">HelpOut !</NavLink>
        <div className="d-flex">
          {authblock}
        </div>

        {navblock}
        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {navitems}
          </div>
            
        </div> */}
      </nav>
      </div>
    )
  } 
}

export default withRouter(Navbar)