import React, {Component} from 'react'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        login_errors: ''
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

    const email = this.state.email
    const password = this.state.password
    
    const url = 'http://localhost:3001/sessions';
    const user = { email, password }

    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    
    .then((response)=>{
      return response.json()
    })
    .then((data) =>{
      if (data.logged_in) {
        this.props.handleLogin(data)
        this.props.history.push("/dashboard")
      } else {
        this.setState({
          registration_errors: "Error in Log In!"
        })
      }
      console.log(data.user)
    })    
    .catch(error => {
      console.log("Log In error", error)
    })
  }
 
     
  render () {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Email address</label>
          <input required type="email" name="email" value={this.state.email} onChange={this.handleInputChange} className="form-control" placeholder="Johdoe@mail.com"/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input required type="password" name="password" value={this.state.password} onChange={this.handleInputChange} className="form-control" placeholder="Enter your password"/>
          <small id="passwordHelp" className="form-text text-muted">Strong passwords are safer</small>
        </div>
        
        {/* <div className="form-group">
          <input type="submit" value="Sign In" className="btn btn-primary"/>
        </div> */}

        <div className="d-flex">
          <input type="submit" value="Sign In" className="btn btn-primary"/>
          <button onClick={this.props.handleModalClose} className="btn btn-primary ml-3">Back</button>
        </div>
      </form>
    )
  }
}

export default Login