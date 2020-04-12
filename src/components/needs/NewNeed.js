import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postNeed } from '../actions/needsAction'
import { withRouter } from 'react-router'

export class NewNeed extends Component {
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
      user: props.user.id
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGeocoding = this.handleGeocoding.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this)

  }

  handleInputChange(event) {
    
    let target = event.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleGeocoding(e) {
    e.preventDefault();

    // Getting data from Geocoding API
    let address = this.state.location
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`

    await fetch(url,
      {method: 'GET'})
      .then((response)=>{
        return response.json()
      })
      .then((data)=>{
        this.setState({
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
          formattedAddress: data.results[0].address_components[1].long_name + " " + data.results[0].address_components[0].long_name + ", " + data.results[0].address_components[7].long_name + " " + data.results[0].address_components[3].long_name
        })
      })
      .catch(error => {
        console.log("registration error", error)
      })

    this.handleSubmit()
  }
      
    handleSubmit() {
      // Posting new help need to database
      let need = {
        userID: this.state.user,
        title: this.state.title,
        description: this.state.description,
        needType: this.state.needType,
        lat: this.state.lat,
        lng: this.state.lng,
        formattedAddress: this.state.formattedAddress,
        status: 'open'
      }
      this.props.postNeed(need)
    }

    componentDidUpdate(prevProps){
      if(this.props.need !== prevProps.need) {
        if(this.props.need.status === "ok") {
          this.handleModalClose();
          this.props.history.push("/dashboard")
        } else {
          alert ("Sorry, your Help request could not be submitted. Check if you have inserted an address with zip code and city and try again!")
        }
      }
    }

    handleModalClose() {
      this.props.handleModalClose()
    }

  render () {
    return (
      
      <div id="newHelpOut">
      <h3>New HelpOut</h3>
      
      <form onSubmit={this.handleGeocoding}>
      
        <div className="form-group">
          <label>Title</label>
          <input required type="text" name="title" value={this.state.title} onChange={this.handleInputChange} className="form-control" placeholder="Short and descriptive title"/>
          <small id="Title" className="form-text text-muted pl-1">Max. 60 characters</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="textarea">Description</label>
          <textarea required name="description" value={this.state.description} onChange={this.handleInputChange} className="form-control" id="textarea" rows="4" placeholder="Informative and concise description of the help request"/>
          <small id="Title" className="form-text text-muted pl-1">Max. 300 characters</small>
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
          <input required type="text" name="location" value={this.state.location} onChange={this.handleInputChange} className="form-control" placeholder="Help request address"/>
          <small id="Title" className="form-text text-muted pl-1">Like in the postal service</small>
        </div>


        <div className="d-flex">
          <input data-testid="submit" type="submit" value="Create" className="btn btn-primary"/>
          <button onClick={this.props.handleModalClose} className="btn btn-primary ml-3">Back</button>
        </div>
      </form>
      </div>
    )
  }

} 

NewNeed.propTypes = {
  postNeed: PropTypes.func.isRequired,
  need: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  need: state.needs.item
})

export default withRouter (connect(mapStateToProps, { postNeed }) (NewNeed))