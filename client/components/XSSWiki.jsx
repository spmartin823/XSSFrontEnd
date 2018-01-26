import React from 'react';
import axios from 'axios'; 
import Loading from './Loading.jsx'; 

// the format of the messages looks like this: 
// {
//   "text" : "seamus was here", 
//   "username" : "seamus", 
//   "roomName" : "---====---"
// }


export default class XSSWiki extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.addToXSSWiki = this.addToXSSWiki.bind(this);
  }

  componentDidMount() {

  }

  addToXSSWiki() {
    axios.post('/api/addMessage')
      .then((res) => {
        let messages = res.data;
        this.setState({ messages });
      })
      .catch((err) => console.log('error in sendMessage in SendMessage.jsx: ', err));
  } 

  render() {
    return (
    <div> 
        This is where the wiki will go
    </div> 
    );
  }
}