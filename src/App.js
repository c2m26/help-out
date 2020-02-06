import React, {Component} from 'react'
import {Provider} from 'react-redux'

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from './components/general/Navbar.js'
import Dashboard from './components/dashboard/Dashboard.js'
import Login from './components/auth/Login.js'
import Registration from './components/auth/Registration.js'
import LandingPage from './components/home/LandingPage.js'
import store from './components/store'




class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      fsHero: false
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleNavbar = this.handleNavbar.bind(this)
  }
// Auth methods
  checkLoginStatus() {
    let url = 'http://localhost:3001/api/v1/logged_in'
    
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

    return (
      <Provider store={store}>
        <div className="app">
          <BrowserRouter>

          <Navbar 
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            loggedInStatus={this.state.loggedInStatus}
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
                handleLogin={this.handleLogin}
                handleNavbar={this.handleNavbar}
                loggedInStatus={this.state.loggedInStatus}
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
                <Dashboard { ... props}
                handleLogin={this.handleLogin}
                user={this.state.user}
                />
              )}
              />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    )
  }         
} 

export default App