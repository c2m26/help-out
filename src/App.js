import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {backendURL} from './components/APIendpoints'
import Navbar from './components/general/Navbar.js'
import Dashboard from './components/dashboard/Dashboard.js'
import LandingPage from './components/home/LandingPage.js'
import NeedDetail from './components/needs/NeedDetail'
import Fulfillment from './components/fulfillment/Fulfillment'
import UserNeedsList from './components/needs/UsersNeedList'
import store from './components/store'
import {ProtectedRoute} from './components/ProtectedRoute'

class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      fsHero: false,
      userLat: null,
      userLng: null
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleNavbar = this.handleNavbar.bind(this)
  }

// Auth methods
  async checkLoginStatus() {
    let url = `${backendURL}/api/v1/logged_in`
    
    await fetch(url, {
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
      };
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

  async handleLogout (){

    let url = `${backendURL}/api/v1/logout`
    
    await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((data)=> {
      if (typeof data.session && data.user === null) {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
      }
    })
    .catch(error => {
      console.log("Log out error", error)
    })
  }

  // Navbar methods for switching props depending on Landingpage true
  handleNavbar(data){
    this.setState({
      fsHero: data
    })
  }

//App rendering method

  render(){
  
    // conditional rendering for Navbar
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
              <ProtectedRoute
                exact
                path={"/dashboard"}
                component = {Dashboard}
                user={this.state.user}
                authStatus={this.state.loggedInStatus}
              />
              <ProtectedRoute
                path={"/helpNeed/:id"}
                component = {NeedDetail}
                user={this.state.user}
                authStatus={this.state.loggedInStatus}
              />
              <ProtectedRoute
                path={"/fulfillment/:id"}
                component = {Fulfillment}
                user={this.state.user}
                authStatus={this.state.loggedInStatus}
              />
              <ProtectedRoute
                path={"/myHelpOuts/:id"}
                component = {UserNeedsList}
                user={this.state.user}
                authStatus={this.state.loggedInStatus}
              />

            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    )
  }         
} 

export default App