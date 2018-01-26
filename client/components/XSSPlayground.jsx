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
  }



  render() {
    return (
    <div> 
        This is where the playgorund will go. 
    </div> 
    );
  }
}