import React from 'react';
import axios from 'axios'; 
import Loading from './Loading.jsx'; 

// the format of the messages looks like this: 
// {
//   "text" : "seamus was here", 
//   "username" : "seamus", 
//   "roomName" : "---====---"
// }


export default class SendMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text : '', 
      username : '', 
      roomName : '', 
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate(e) {
    e.preventDefault()
    console.log('this in handleUpdate: ', e.target.name, e.target.value)
    let name = e.target.name
    let value = e.target.value
    this.setState({[name]: value})
  }


  sendMessage(e) {
    e.preventDefault()
    axios.post('/api/addMessage', {
      text : this.state.text, 
      username : this.state.username, 
      roomName : this.state.roomName, 
    })
      .then((res) => {
        console.log('this is the state that was sent: ', this.state)
        console.log('this was the response, ', res)
      })
      .catch((err) => console.log('error in sendMessage in SendMessage.jsx: ', err));
  } 

  render() {
    return (
    <div> 
      <input
        type="text"
        placeholder="Username"
        name="username"
        onChange={this.handleUpdate}
      />
      <input
        type="text"
        name="text"
        placeholder="Message Text"
        onChange={this.handleUpdate}
      />

      <input
        type="text"
        name="roomName"
        placeholder="Room Name"
        onChange={this.handleUpdate}
      />

      <input
        type="number"
        name="timesToSend"
        placeholder="Times to Send (max = 10)"
        onChange={this.handleUpdate}
      />
      <button
        title = "Send Message"
        onClick={this.sendMessage}
      > 
        Send Message
      </button>  
    </div> 
    );
  }
}




