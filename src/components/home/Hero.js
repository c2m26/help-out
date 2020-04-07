import React, { Fragment } from 'react'
import './Hero.css'
import image from '../../images/hero.jpg'
import { NavLink } from 'react-router-dom'

const Hero = (props) => {
  const styles = {
    backgroundImage: "url(" + image + ")"
  }

  let block

  if (props.loggedInStatus === 'LOGGED_IN') {
    block = 
    <NavLink className="btn btn-lg btn-warning m-4" data-testid="conditionalLinkButton" to="/dashboard">Check them out!</NavLink>
  } else {
    block =
      <Fragment>
      <h2 className="p-1" id="secondHeading" data-testid="conditionalText">Help Out !</h2>
      </Fragment>
  }

  return ( 

    <div style={styles} id="hero-wrapper">

      <div className="overlay d-flex flex-column justify-content-center align-items-center text-center text-white">    
          <h1 className="p-1" id="mainHeading">Together we are stronger</h1>
          <h2 className="p-1 d-none d-lg-block" id="secondHeading">and</h2>
          <h2 className="p-1 d-none d-lg-block" id="secondHeading">each pair of hands counts</h2>
          <h3 className="p-2"><span id="secondHeading">{props.counter} </span>help requests are currently unfulfilled</h3>
          {block}
      </div>
    </div>
  
  )
}

export default Hero