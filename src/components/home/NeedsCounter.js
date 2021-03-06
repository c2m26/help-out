import React, { Component, Fragment } from 'react'

class NeedsCounter extends Component {
  constructor(props){
    super(props)

    this.state = {
      openNeeds: []
    }

    this.getOpenNeeds = this.getOpenNeeds.bind(this)
  }

  componentDidMount(){
    this.getOpenNeeds();
    this.timerID = setInterval(
      () => this.getOpenNeeds(),
      5000
    );
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  // fetching status=open needs from API
  async getOpenNeeds() {
      
    let url = 'http://localhost:3001/api/v1/needs/get_openNeeds'

    await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{
      return response.json()
    })
    .then((data) => this.setState({
      openNeeds: data
    }))
    .catch(error => {
      console.log("Error fetching 'open' needs", error)
    });

  }

  render() {
    return(
      <Fragment>
        {this.state.openNeeds.length}
      </Fragment>
    )
  }


} export default NeedsCounter