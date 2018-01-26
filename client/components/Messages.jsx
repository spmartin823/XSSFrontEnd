import React from 'react';
import axios from 'axios'; 
import Loading from './Loading.jsx'; 
import SendMessage from './SendMessage.jsx'
// the format of the messages looks like this: 
// {"objectId":"GliM5XzAT2",
// "text":"post from localhost",
// "username":"seamus",
// "roomName":"---====---",
// "createdAt":"2018-01-26T15:55:55.551Z",
// "updatedAt":"2018-01-26T15:55:55.551Z"}


export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: null, 
    }
    this.getMessages = this.getMessages.bind(this);
  }

  componentDidMount() {
    this.getMessages()
  }

  getMessages() {
    axios.get('/api/getAllMessages')
      .then((res) => {
        let messages = res.data.results;
        this.setState({ messages }, () => {
          setTimeout(() => this.getMessages(), 1000)
        });
      })
      .catch((err) => console.log('error in getMessages in Messages.jsx: ', err));
  } 

  render() {
    return !this.state.messages 
    ? (<Loading />) 
    : (
      <div> 
        <SendMessage />
        <div className="txn">
          <h3>Messages</h3>
          <div className="txn-table">
            <div className="txn-header txn-row">
              <div className="txn-data">
                <div className="half-txn-data">
                  <div className="half-txn-data">Author</div>
                  <div className="half-txn-data">Room</div>
                </div> 
              </div>
              <div className="txn-data">Message</div>

            </div>
            <div> 
            {!this.state.messages 
              ? <Loading /> 
              : this.state.messages.map(message => {
                console.log('this is the username: ', message.username)
                return (
                  <div className="txn-row" key={message.objectId}>
                    <div className="txn-data">
                      <div className="half-txn-data">{message.username}</div>
                      <div className="half-txn-data">{message.roomName}</div>
                    </div>
                    <div className="txn-data">{message.text}</div>
                  </div> 
                )
              })
            }
          </div>
        </div>
      </div>
    </div>  
    );
  }
}




