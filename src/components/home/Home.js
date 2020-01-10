import React, { Component } from 'react'
import Registration from '../auth/Registration.js'
import Login from '../auth/Login.js'

class Home extends Component {
  constructor(props) {
    super(props)

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data)
    this.props.history.push("/dashboard")
  }

  handleLogoutClick(){
    let url = 'http://localhost:3001/logout'
    
    fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(reponse => {
      this.props.handleLogout()
    })
    .catch (error => {
      console.log("logout error", error)
    })
  }

  render() {
    return (
      <div>
        <h1>Teste Inicial</h1>
        <h1>Status: {this.props.loggedInStatus} </h1>
        <button onClick={this.handleLogoutClick}>Logout</button>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/>
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
      </div>
    )
  }

}

export default Home