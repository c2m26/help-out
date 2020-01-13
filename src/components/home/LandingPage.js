import React, {Component} from 'react'
import Hero from './Hero.js'


class LandingPage extends Component {
  constructor (props) {
    super(props)

    this.state={
      fsHero: true
    }
  }

  render () {
    return (
    
      <Hero />
      
    
  )}
}

export default LandingPage