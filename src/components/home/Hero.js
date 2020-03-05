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
    <NavLink className="btn btn-lg btn-warning m-4" to="/dashboard">Check them out!</NavLink>
  } else {
    block =
      <Fragment>
      <h2 className="p-1" id="secondHeading">Help Out!</h2>
      </Fragment>
  }

  return ( 

    <div style={styles} id="hero-wrapper">

      <div className="overlay d-flex flex-column justify-content-center align-items-center text-center text-white">    
          <h1 className="p-1" id="mainHeading">Together we are stronger</h1>
          <h2 className="p-1" id="secondHeading">and</h2>
          <h2 className="p-1" id="secondHeading">each pair of hands counts</h2>
          <h3 className="p-1"><span id="secondHeading">{props.counter} </span>help requests are currently unfufilled</h3>
          {block}
      </div>
    </div>
  
  )
}

export default Hero