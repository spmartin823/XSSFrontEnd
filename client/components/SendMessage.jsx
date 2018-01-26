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
      message: null, 
    }
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {

  }

  sendMessage(e) {
    e.preventDefault()


    axios.post('/api/addMessage', {
      text : 'this is posting error'

    })
      .then((res) => {
        let messages = res.data;
        this.setState({ messages });
      })
      .catch((err) => console.log('error in sendMessage in SendMessage.jsx: ', err));
  } 

  render() {
    return (
    <div> 
      <input
        type="text"
        placeholder="Username"
        onChange={this.handleUpdate}
      />
      <input
        type="text"
        placeholder="Message Text"
        onChange={this.handleUpdate}
      />

      <input
        type="text"
        placeholder="Room Name"
        onChange={this.handleUpdate}
      />

      <input
        type="number"
        placeholder="Times to Send (max = 10)"
        onChange={this.handleUpdate}
      />
      <button
        title = "Send Message"
        onClick={this.sendMessage}
      />
    </div> 
    );
  }
}




