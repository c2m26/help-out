import React, { Component, Fragment } from 'react'
import {withRouter} from 'react-router-dom'
import {backendURL} from '../APIendpoints'

class Conversation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      conversationID: null,
      messages:[],
      messageInput: ''
    }
    this.getMessages = this.getMessages.bind(this);
    this.getConversationID = this.getConversationID.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.getConversationID()

    this.timerID = setInterval(
      () => this.getMessages(),
      6000
    );
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  async getConversationID() {

    const url = `${backendURL}/api/v1/conversations/getID?id=${parseInt(this.props.match.params.id)}`;
    
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
        conversationID: data
    }))    
    .catch(error => {
      console.log("Error getting conversation ID", error)
    })

    this.getMessages()
  }  

  async getMessages() {

    console.log(this.state.conversationID)

    const url = `${backendURL}/api/v1/messages/get_Messages?id=${this.state.conversationID}`;
    
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
        messages: data
    }))    
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

  async handleSubmit(event){
    event.preventDefault();

    const message = {
      conversationID: this.state.conversationID,
      senderID: this.props.user.id,
      content: this.state.messageInput
    }

    console.log(JSON.stringify(message))

    const url = `${backendURL}/api/v1/messages`;
    
    await fetch(url, {
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

    this.getMessages()
    
    this.setState({
      messageInput: ''
    })
  }

  render() {
    
    let conversation

    if(this.state.messages.length > 0) {
      conversation = this.state.messages.map( message => {
        let flexDirection
        let alignText
        let bgColor
        let textColor

        if(message.senderID === this.props.creatorID) {
          flexDirection = '-reverse';
          alignText= '-right';
          bgColor = '-info';
          textColor = '-white';
          message.senderName = this.props.creatorName
        } else {
          flexDirection = '';
          alignText= '-left';
          bgColor = '-warning';
          textColor = '-dark';
          message.senderName = this.props.helperName
        }
        return(
          
          <div key={message.id} className={`d-flex flex-row${flexDirection} m-2`}>
            <div className={`col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3 text${alignText}`}>{message.senderName}</div>
            <div className={`font-italic text${alignText} text${textColor} bg${bgColor} p-2 rounded-lg d-flex flex-wrap`}>{message.content}</div>
          </div>
          
        )       
      })
    } else {
      conversation = "No messages so far"
    }

    return(
      <Fragment>
        <div data-testid="conversation" className="flex-grow-1 bg-light pt-1" style={{overflow: 'scroll'}}>
          {conversation}
        </div>
        
        <form data-testid="messageInput" className="d-flex" onSubmit={this.handleSubmit}>
          <input required type="message" name="messageInput" value={this.state.messageInput} onChange={this.handleInputChange} id="textarea" className="form-control mr-2 my-2"/>
          <input data-testid="submit" type="submit" value="Send" className="btn btn-primary ml-2 my-2"/> 
        </form>
      </Fragment>    
    )
  }
} export default withRouter(Conversation)