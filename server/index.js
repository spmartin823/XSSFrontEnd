const express = require('express');
let path = require('path');
const bodyParser = require('body-parser');
const { 
        logger,   
        getInvestmentData, 
        getCampaignTerms, 
        getAllCampaigns 
      } = require('./util')

const app = express();

// Middleware
app.use(logger);
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/dist`));

// Routes 
// take campaignId in here so that the amount of data sent back and loaded for 
// each page. 
app.get('/api/investments/:campaignId', getInvestmentData);
app.get('/api/campaign/:id', getCampaignTerms);
app.get('/api/campaigns/', getAllCampaigns);

// Fallback route for react router
app.get('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`) );

let port = process.env.port || 3000;
app.listen(port, () => console.log(`Now listening on ${port}`));