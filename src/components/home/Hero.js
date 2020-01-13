import React from 'react'
import './Hero.css'
import AuthButtons from './AuthButtons.js'
import image from '../../images/hero.jpg'

const Hero = () => {
  const styles = {
    backgroundImage: "url(" + image + ")"
  }
  return (
  
    <div style={styles} id="hero-wrapper">

      <div className="overlay d-flex flex-column justify-content-center align-items-center text-center text-white">    
          <h1 className="p-1" id="mainHeading">Together we are stronger</h1>
          <h2 className="p-1" id="secondHeading">and</h2>
          <h2 className="p-1" id="secondHeading">each pair of hands counts</h2>
          <h3 className="p-1" >help requests are currently unfufilled</h3>
          <h2 className="p-1" id="secondHeading">Help out!</h2>
          <AuthButtons />
      </div>
    </div>
  
  )
}

export default Hero