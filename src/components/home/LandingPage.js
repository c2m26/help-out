import React, {Component} from 'react'
import Hero from './Hero.js'
import AuthButtons from './AuthButtons'


class LandingPage extends Component {
  
  componentDidMount(){
    this.props.handleNavbar(true)
    console.log("mounted")
  }
  

  componentWillUnmount(){
    this.props.handleNavbar(false)
    console.log("unmounted")
  }

  render () {
    
    return (
    
      <Hero
        content=
          {<AuthButtons
            handleLogin={this.props.handleLogin}
            handleNavbar={this.props.handleNavbar}
            loggedInStatus={this.props.loggedInStatus}
        />}
        
      />
      
    
  )}
}

export default LandingPage