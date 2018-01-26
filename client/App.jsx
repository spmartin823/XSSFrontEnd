import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios'; 
import { BrowserRouter, Router, Route, Link, Switch } from 'react-router-dom';

import SendMessage from './components/SendMessage.jsx';
import Messages from './components/Messages.jsx';
import XSSWiki from './components/XSSWiki.jsx';
import Loading from './components/Loading.jsx'; 
import XSSPlayground from './components/XSSPlayground.jsx'

class App extends React.Component {
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
    axios.get('/api/campaigns')
      .then((res) => {
        let campaigns = res.data;
        this.setState({ campaigns });
      })
      .catch((err) => console.log('error in getCampaigns in App.jsx: ', err));
  } 

  render() {
    return !this.state.campaigns 
    ? (<Loading />) 
    : (
      <BrowserRouter>
        <div className="app">
          <Switch> 
            <Route exact path='/XSSPlayground' component={XSSPlayground} />
            <Route exact path='/messages' component={Messages} /> 
            <Route exact path='/wiki' component={XSSWiki} /> 
            <Route exact path='/' component={Messages} /> 
          </Switch> 

         {/*} <Messages /> 

          <div className="campaign">
              <h3>Navigation</h3>
              <h4>Click a link below to navigate to that page: </h4>
              <div className="campaign-list">
     
                <Link to={'/XSSPlayground'}>
                  <div className="campaign-data">Test a XSS Attack</div>
                </Link>
                <Link to={'/messages'}>
                  <div className="campaign-data">Messages</div>
                </Link>
                <Link to={'/wiki'}>
                  <div className="campaign-data">XSS Wiki</div>
                </Link>
              </div>
          </div> 
        */}
        </div>
      </BrowserRouter>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
