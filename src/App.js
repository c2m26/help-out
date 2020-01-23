import React, {Component, Fragment} from 'react'
import  {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from './components/general/Navbar.js'
import Dashboard from './components/dashboard/Dashboard.js'
import Login from './components/auth/Login.js'
import Registration from './components/auth/Registration.js'
import LandingPage from './components/home/LandingPage.js'
import Modal from './components/general/modal/Modal.js'


class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      fsHero: false,
      contentModal: 'none'
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleNavbar = this.handleNavbar.bind(this)
    this.handleContentModal = this.handleContentModal.bind(this)
  }
// Auth methods
  checkLoginStatus() {
    let url = 'http://localhost:3001/logged_in'
    
    fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((data)=> {
      if (data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: data.user
        })
      } else if (!data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
      }
    })
    .catch(error => {
      console.log("Log In error", error)
    })
  }

  componentDidMount() {
    this.checkLoginStatus()
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: 'LOGGED_IN',
      user: data.user
    })
  }

  handleLogout (){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }

  // Navbar methods for switching props depending on Landingpage true
  handleNavbar(data){
    this.setState({
      fsHero: data
    })
    console.log(this.state.fsHero)
  }

  //Modal methods

  handleContentModal(data){
    this.setState({
      contentModal: data
    })
    console.log(this.state.contentModal)
    console.log(data)
  }

//Modal rendering method
  renderModal(){
    console.log(this.state.contentModal)
    //conditional rendering for Modal content
    if(this.state.contentModal === "signup") {
      return(
        <Modal
          content={<Registration />}
        />  
      )
    } else {
      return(
        null
      )
    }
    
  }

//App rendering method
  render(){
  
    // conditional rendering for Navbar
    
    console.log(this.state.fsHero)
    let navcolorscheme
    let navbg
    let textColor

    if (this.state.fsHero) {
      navcolorscheme = "navbar-dark"
      navbg = "bg-transparent"
      textColor = "text-white"
    } else {
      navcolorscheme = "navbar-light"
      navbg = "bg-white"
      textColor = "text-dark"
    }

    // this.renderModal()

    return (
      <div className="app">

        {this.renderModal()}
      
        <BrowserRouter>
          
        <Navbar 
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          loggedInStatus={this.state.loggedInStatus}
          handleShowModal={this.handleShowModal}
          handleContentModal={this.handleContentModal}
          user={this.state.user}
          navcolorscheme={navcolorscheme}
          navbg={navbg}
          textColor={textColor}
        />
        
          <Switch>
          
            <Route
            exact
            path = {"/"}
            render = {props => (
              <LandingPage {...props}
              handleNavbar={this.handleNavbar}
              />
            )}
            />
            <Route 
            exact
            path={"/signup"}
            render = {props => (
              <Registration {...props}
              handleLogin={this.handleLogin}
              />
            )}
            />
            <Route 
            exact
            path={"/signin"}
            render = {props => (
              <Login { ... props}
              handleLogin={this.handleLogin}
              />
            )}
            />
            <Route
            exact
            path={"/dashboard"}
            render = {props => (
              <Dashboard { ... props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus}/>
            )}
            />
          </Switch>
        </BrowserRouter>
      </div>
      
    )
  }         
} 

export default App