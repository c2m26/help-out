import React, { Component } from 'react'
// import {withRouter} from 'reac-router-dom'
import Keys from '../Keys'

class NewNeed extends Component {
  constructor (props) {
    super (props)

    this.state = {
      title: '',
      description: '',
      needType: '',
      lat: '',
      lng: '',
      location: '',
      formattedAddress: '',
      user: props.user
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleInputChange(event) {
    
    let target = event.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }



  handleSubmit(e) {
    e.preventDefault();

    // Getting data from Geocoding API
    let address = this.state.location
    let apiKey = Keys.googleMaps
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`

    fetch(url,
      {method: 'GET'})
      .then((response)=>{
        return response.json()
      })
      .then((data)=>{
        this.setState({
          lat: data.results[0].geometry.location.lat,
          long: data.results[0].geometry.location.lng,
          formattedAddress: data.results[0].formatted_address
        })

          console.log(data)
      })
      .catch(error => {
        console.log("registration error", error)
      })
      -t
      // Posting new help need to database
    
  }

  render () {
    return (
      
      <div>
      <h3>New HelpOut</h3>
      
      <form onSubmit={this.handleSubmit}>
      
        <div className="form-group">
          <label>Title</label>
          <input required type="text" name="title" value={this.state.title} onChange={this.handleInputChange} className="form-control" placeholder="Short and descriptive title"/>
        </div>
        
        <div className="form-group">
          <label htmlFor="textarea">Description</label>
          <textarea required name="description" value={this.state.description} onChange={this.handleInputChange} className="form-control" id="textarea" rows="4" placeholder="Brief descrption of the help need in maximum 300 characters"/>
        </div>

        <div className="form-group">
          <label>Help Need Type</label>

          <div className="form-group">
          
          <div className="custom-control custom-radio custom-control-inline">
            <input required type="radio" name="needType" id="customRadio1" value="material" checked={this.state.needType === "material"} onChange={this.handleInputChange} className="custom-control-input"/>
            <label className="custom-control-label" htmlFor="customRadio1">Material Need</label>
          </div>
          <div className="custom-control custom-radio custom-control-inline">
            <input required type="radio" name="needType" id="customRadio2" value="oneTime" checked={this.state.needType === "oneTime"} onChange={this.handleInputChange} className="custom-control-input"/>
            <label className="custom-control-label" htmlFor="customRadio2">One-time Task</label>
          </div>
          </div>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input required type="text" name="location" value={this.state.location} onChange={this.handleInputChange} className="form-control" placeholder="Help need address"/>
        </div>


        <div className="d-flex">
          <input type="submit" value="Create" className="btn btn-primary"/>
          <button onClick={this.props.handleModalClose} className="btn btn-primary ml-3">Back</button>
        </div>
      </form>
      </div>
    )
  }

} 
// export default withRouter(NewNeed)

export default NewNeed