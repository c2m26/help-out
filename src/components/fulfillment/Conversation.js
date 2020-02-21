import React, { Component, Fragment } from 'react'
import {withRouter} from 'react-router-dom'

class Conversation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages:[]
    }
    this.getMessages = this.getMessages.bind(this)
  }

  componentDidMount(){
    this.getMessages()
  }

  async getMessages() {

    const conversationID = this.props.match.params.id;
    console.log(conversationID)

    const url = `http://localhost:3001/api/v1/messages?id=${conversationID}`;
    
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

      </Fragment>    
    )
  }
} export default withRouter(Conversation)