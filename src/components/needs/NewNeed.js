import React, { Component } from 'react'
// import {withRouter} from 'reac-router-dom'

class NewNeed extends Component {
  constructor (props) {
    super (props)

    this.state = {
      title: '',
      description: '',
      type: '',
      lat: '',
      long: '',
      user: props.user
    }

    this.handleInputChange = this.handleInputChange.bind(this);

  }

  handleInputChange(event) {
    
    let target = event.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  render () {
    return (
      
      <div>
      <h3>New HelpOut</h3>
      
      {/* <form onSubmit={this.handleSubmit}> */}
      <form>
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
          
          <div className="custom-control custom-checkbox custom-control-inline">
            <input required type="checkbox" name="type" id="customCheck1" value={this.state.type} onChange={this.handleInputChange} className="custom-control-input"/>
            <label className="custom-control-label" htmlFor="customCheck1">Material Need</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input required type="checkbox" name="type" id="customCheck2" value={this.state.type} onChange={this.handleInputChange} className="custom-control-input"/>
            <label className="custom-control-label" htmlFor="customCheck2">One-time Task</label>
          </div>
          </div>
        </div>

        <div className="form-group">
          <label>Location</label>


          <div className="form-row">
            <div className="col-6">
              <input required type="text" name="lat" value={this.state.lat} onChange={this.handleInputChange} className="form-control" placeholder="Latitude"/>
            </div>
            <div className="col-6">
              <input required type="text" name="long" value={this.state.long} onChange={this.handleInputChange} className="form-control" placeholder="Longitude"/>
            </div>
          </div>

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