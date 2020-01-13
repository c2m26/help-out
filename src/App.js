import React, {Component} from 'react'
import  {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navabar from './components/general/Navbar.js'
import Home from './components/home/Home.js'
import Dashboard from './components/dashboard/Dashboard.js'
import Login from './components/auth/Login.js'
import Registration from './components/auth/Registration.js'
import LandingPage from './components/home/LandingPage.js'


class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    // this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
  }

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

  // handleSuccessfulAuth(data) {
  //   this.props.handleLogin(data)
  //   this.props.history.push("/dashboard")
  // }

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
  


  render(){
    return (
      <div className="app">
      
        <BrowserRouter>
          
        <Navabar 
        
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          loggedInStatus={this.state.loggedInStatus}
          user={this.state.user}
        />
        
          <Switch>
          
            {/* <Route
            exact
            path={"/"}
            // component = {Home}
            render = {props => (
              <Home { ... props}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              loggedInStatus={this.state.loggedInStatus}
              />
            )}
            /> */}
            <Route
            exact
            path = {"/"}
            component = {LandingPage}
            />
            <Route 
            exact
            path={"/signup"}
            render = {props => (
              <Registration {...props}
              handleLogin={this.handleLogin}
              // handleLogout={this.handleLogout}
              // loggedInStatus={this.state.loggedInStatus}
              />
            )}
            />
            <Route 
            exact
            path={"/signin"}
            render = {props => (
              <Login { ... props}
              // handleSuccessfulAuth={this.handleSuccessfulAuth}
              handleLogin={this.handleLogin}
              // handleLogout={this.handleLogout}
              // loggedInStatus={this.state.loggedInStatus}
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