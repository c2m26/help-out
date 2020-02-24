import React, {Component} from 'react'
import {Provider} from 'react-redux'

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from './components/general/Navbar.js'
import Dashboard from './components/dashboard/Dashboard.js'
import LandingPage from './components/home/LandingPage.js'
import NeedDetail from './components/needs/NeedDetail'
import Fulfillment from './components/fulfillment/Fulfillment'
import UserNeedsList from './components/needs/UsersNeedList'
import store from './components/store'




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
    this.getUserLocation = this.getUserLocation.bind(this)
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
    // to be removed once workign fine in redux
    this.getUserLocation()
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

  // getting user location; to moved to global state
  getUserLocation(){
    navigator.geolocation.getCurrentPosition( position => {
      this.setState({
        userLat: position.coords.latitude,
        userLng: position.coords.longitude
      })
    })
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
                path={"/dashboard"}
                render = {props => (
                  <Dashboard { ... props}
                  handleLogin={this.handleLogin}
                  user={this.state.user}
                  />
                )}
              />
              <Route
                path={"/helpNeed/:id"}
                render = {props => (
                  <NeedDetail {...props}
                  user={this.state.user}
                  />
                )}
              />
              <Route
                path={"/fulfillment/:id"}
                render = {props => (
                  <Fulfillment {...props}
                  user={this.state.user}
                  />
                )}
              />
              <Route
                path={"/myHelpOuts/:id"}
                render = {props => (
                  <UserNeedsList {...props}
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