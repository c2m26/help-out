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
        registration_errors: '',
        idDoc: null,
        idDocName: 'Choose File'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
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

  handleFileSelect(event) {
    this.setState({
      idDoc: event.target.files[0],
      idDocName: event.target.files[0].name
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    // alert(
    //   `Selected file - ${
    //     this.fileInput.current.files[0].name
    //   }`
    // )

    const firstName = this.state.firstName
    const lastName = this.state.lastName
    const email = this.state.email
    const password = this.state.password
    const password_confirmation = this.state.password_confirmation
    
    const url = 'http://localhost:3001/registrations';
    const user = { firstName, lastName, email, password, password_confirmation }
    
    user.append('idFile', this.state.idDoc, this.state.idDoc.name)

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
        <label>Upload Id Document</label>
          <div className="custom-file">
            <input required type="file" className="custom-file-input" id="customFile" onChange={this.handleFileSelect}/>
            <label className="custom-file-label" htmlFor="customFile">
              {this.state.idDocName}
            </label>
          </div>
        </div>
        

        <div className="form-group">
          <input type="submit" value="Sign Up" className="btn btn-primary"/>
        </div>
      </form>
    )
  }
}

export default Registration