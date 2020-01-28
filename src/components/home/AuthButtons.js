import React from 'react'
import {NavLink} from 'react-router-dom'

const AuthButtons = () => {
  return(
    <div className="d-flex justify-content-center align-items-center">
      <NavLink className="btn btn-lg btn-primary m-4" to="/signin">Sign In</NavLink>
      <NavLink className="btn btn-lg btn-primary m-4" to="/signup">Sign Up</NavLink> 
    </div>
  )
}

export default AuthButtons
