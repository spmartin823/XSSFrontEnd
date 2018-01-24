import React from 'react';
import axios from 'axios'; 
import Loading from './Loading.jsx'; 
import { formatTransactions } from '../helpers/formatters'; 

export default class Transactions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      campaign: null, 
      campaignTerms: null, 
      transactions: null
    }
    this.formatTransactions = formatTransactions.bind(this); // imported
    this.setCampaign = this.setCampaign.bind(this);
    this.getCampaignTerms = this.getCampaignTerms.bind(this);
    // TODO: Allow sorting by headers
  }

  componentDidMount() {
    this.setCampaign(window.location.pathname, this.getCampaignTerms); 
  }

  componentWillReceiveProps() {
    // this will trigger on subsequent clicks of the campaigns because they change
    // the this.props.match.params. 
    this.setState({transactions : null}, () => 
      this.setCampaign(window.location.pathname, this.getCampaignTerms)
    )
  }

  setCampaign(location, cb) {
    if (location.includes('campaign')) {
      let campaign = location.split('/')[2]; 
      this.setState({ campaign }, cb(campaign));
    }
  }

  getCampaignTerms(campaign) {
    axios.get(`/api/campaign/${campaign}`)
      .then((res) => {
        let campaignTerms = res.data;
        this.setState({ campaignTerms }, this.getTransactionData(campaign, campaignTerms));
      })
      .catch((err) => console.log('error in getCampaigns in App.jsx: ', err));
  }

  getTransactionData(campaign, campaignTerms) {
    axios.get(`/api/investments/${campaign}`)
      .then((res) => {
        let transactions = this.formatTransactions(res.data, campaignTerms);
        this.setState({ transactions });
      })
      .catch((err) => console.log('error in getCampaigns in App.jsx: ', err));
  }


  render() {
    return (
      <div className="txn">
        <h3>Transactions</h3>
        <div className="txn-table">
          <div className="txn-header txn-row">
            <div className="txn-data">Id</div>
            <div className="txn-data">Date</div>
            <div className="txn-data">Investor</div>
            <div className="txn-data">
              <div className="half-txn-data">Amount</div>
              <div className="half-txn-data">Status</div>
            </div>
          </div>
          <div> 
          {!this.state.transactions && this.state.campaign 
            ? <Loading /> 
            : !this.state.transactions && !this.state.campaign 
            ? <h2> Select a campaign ID to the right to see it's transactions </h2>
            : this.state.transactions.map(transaction => {
              return (
                <div className="txn-row" key={transaction.id}>
                  <div className="txn-data">{transaction.id}</div>
                  <div className="txn-data">{new Date(transaction.date).toString()}</div>
                  <div className="txn-data">{transaction.investor}</div>
                  <div className="txn-data">
                    <div className="half-txn-data">{transaction.amount}</div>
                    <div className="half-txn-data">{transaction.status}</div>
                  </div>
                </div> 
              )
            })
          }
        </div>
      </div>
    </div> 
    );
  }
}

