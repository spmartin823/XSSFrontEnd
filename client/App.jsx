import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios'; 
import { BrowserRouter, Router, Route, Link, Switch } from 'react-router-dom';

import Transactions from './components/Transactions.jsx';
import Loading from './components/Loading.jsx'; 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: null, 
    }

    this.getCampaigns = this.getCampaigns.bind(this);
    // TODO: hash the response for the campaigns and store them in cookie 
    // storage to limit API calls and decrease load time. 
    // TODO: Redis
    // TODO: Change document.title on navigation
  }

  componentDidMount() {
    this.getCampaigns();
  }

  getCampaigns() {
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
            <Route exact path='/campaigns/:campaignId' component={Transactions} />
            <Route exact path='/' component={Transactions} /> 
          </Switch> 
          <div className="campaign">
              <h3>Campaigns</h3>
              <h4>Select a campaign ID below to see it's transactions</h4>
              <div className="campaign-list">
                {this.state.campaigns.map((campaign) => 
                    <Link key={campaign} to={`/campaigns/${campaign}`}>
                      <div className="campaign-data">{campaign}</div>
                    </Link>
                  )
                }
              </div>
          </div> 
        </div>
      </BrowserRouter>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
