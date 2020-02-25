import React, { Component, Fragment } from 'react'
import {withRouter} from 'react-router-dom'

class Conversation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      conversationID: null,
      messages:[],
      messageInput: ''
    }
    this.getMessages = this.getMessages.bind(this);
    this.getConversationID = this.getConversationID.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.getConversationID()
  }

  async getConversationID() {

    const url = `http://localhost:3001/api/v1/conversations/getID?id=${parseInt(this.props.match.params.id)}`;
    
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
    .then((data) =>{
      console.log(data);
      this.setState({
        conversationID: data.id
      })
    })    
    .catch(error => {
      console.log("Error getting conversation ID", error)
    })

    this.getMessages()
  }  

  async getMessages() {

    console.log(this.state.conversationID)

    const url = `http://localhost:3001/api/v1/messages/get_Messages?id=${this.state.conversationID}`;
    
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
    .then((data) =>{
      console.log(data);
      this.setState({
        messages: data.data
      })
    })    
    .catch(error => {
      console.log("Error getting help need creator ID", error)
    })
  }

  handleInputChange(event) {
    
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event){
    event.preventDefault();

    const message = {
      conversationID: this.state.conversationID,
      senderID: this.props.user.id,
      content: this.state.messageInput
    }

    console.log(JSON.stringify(message))

    const url = 'http://localhost:3001/api/v1/messages';
    
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
    .then((response)=>{
      return response.json()
    })
    .then(message =>{
      console.log(message)
    }
      )
    .catch(error => {
      console.log("Message could not be sent", error)
    })

  }

  render() {
    
    let conversation

    if(this.state.messages.length > 0) {
      conversation = this.state.messages.map( message => {
        let flexDirection
        let alignText
        if(message.senderID === this.props.creatorID) {
          flexDirection = '-reverse';
          alignText= '-right'
        } else {
          flexDirection = ''
          alignText= '-left'
        }
        return(
          <div key={message.id} className={`d-flex flex-row${flexDirection}`}>
            <div className={`col-xl-2 text${alignText}`}>{message.senderID}</div>
            <div className={`col-xl-10 text${alignText}`}>{message.content}</div>
          </div>
        )       
      })
    } else {
      conversation = "No messages so far"
    }

    return(
      <Fragment>
        <div> {conversation} </div>
        
        <form className="d-flex" onSubmit={this.handleSubmit}>
          <input required type="message" name="messageInput" value={this.state.messageInput} onChange={this.handleInputChange} id="textarea" className="form-control m-2"/>
          <input type="submit" value="Send" className="btn btn-primary m-2"/> 
        </form>

      </Fragment>    
    )
  }
} export default withRouter(Conversation)