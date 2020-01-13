import React, {Component} from 'react'

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password_confirmation: '',
        registration_errors: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
 
  }

  handleSubmit(event) {
    event.preventDefault();

    const firstName = this.state.firstName
    const lastName = this.state.lastName
    const email = this.state.email
    const password = this.state.password
    const password_confirmation = this.state.password_confirmation
    
    const url = 'http://localhost:3001/registrations';
    const user = { firstName, lastName, email, password, password_confirmation }

    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    })
    
    .then((response)=>{
      return response.json()
    })
    .then((data) =>{
      if (data.status === 'created') {
        this.props.handleLogin(data)
        this.props.history.push("/dashboard")
      } else {
        this.setState({
          registration_errors: "Error in registration!"
        })
      }
      console.log(data.user)
    })    
    .catch(error => {
      console.log("registration error", error)
    })
  }
 
     
  render () {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input required type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} className="form-control" placeholder="John"/>
        </div>
        
        <div className="form-group">
          <label>Last Name</label>
          <input required type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} className="form-control" placeholder="Doe"/>
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input required type="email" name="email" value={this.state.email} onChange={this.handleInputChange} className="form-control" placeholder="Johdoe@mail.com"/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input required type="password" name="password" value={this.state.password} onChange={this.handleInputChange} className="form-control" placeholder="Enter your password"/>
          <small id="passwordHelp" className="form-text text-muted">Strong passwords are safer</small>
        </div>
        <div className="form-group">
          <label>Password Confirmation</label>
          <input required type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleInputChange} className="form-control" placeholder="Confirm your password"/>
        </div>
        
        <div className="form-group">
          <input type="submit" value="Sign Up" className="btn btn-primary"/>
        </div>
      </form>
    )
  }
}

export default Registration