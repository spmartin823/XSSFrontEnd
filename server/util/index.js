const request = require('request');
const { REPUBLIC_API_SECRET } = require('../../config/republicAPI')


const logger = (req, res, next) => {
  console.log(`${req.method} request received at ${req.url}`);
  next();
};


const getInvestmentData = (req, res) => {
  let campaignId = req.params.campaignId;
  makeInvestmentDataServerRequest(investmentData => {
    let parsedData = parseInvestmentDataByCampaignId(investmentData, campaignId);
    res.send(parsedData);
  })
}


const makeInvestmentDataServerRequest = (cb = () => {}) => {
  // helper for getInvestmentData and getAllCampaigns
  var options = { 
    method: 'GET',
    url: 'https://republic.co/api/engineering_challenge/investment_request_logs',
    headers: { 
      'Cache-Control': 'no-cache',
      'X-Republic-API-Secret': REPUBLIC_API_SECRET 
    } 
  };
  request(options, function (error, response, body) {
    if (error) console.error(error);
    cb(body);
  });
}


const parseInvestmentDataByCampaignId = (data, campaignId) => {
  // a helper for getInvestmentData
  let parsedData = JSON.parse(data);
  let logs = parsedData["investment_request_logs"];
  let records = logs.split('\n');
  return records
    .filter(record => record.includes(`campaign_id=${campaignId}`))
    .map(filteredRecord => 
    filteredRecord
      .split(' ')
      .reduce((acc, field) => {
        let [key, value] = field.split('=');
        acc[key] = value;
        return acc;
      }, {})
    )
}


const getCampaignTerms = (req, res) => {
  let id = req.params.id;
  getCampaignTermsById(id, (data) => {
    let parsedTerms = JSON.parse(data)['campaign'];
    if (res) res.send(parsedTerms);
    return parsedTerms;
  })
}


const getCampaignTermsById = (id, cb = () => {}) => {
// this is a helper for getCampaignTerms
var options = { 
  method: 'GET',
  url: `https://republic.co/api/engineering_challenge/campaign/${id}`,
  headers: { 
     'Cache-Control': 'no-cache',
     'X-Republic-API-Secret': REPUBLIC_API_SECRET 
   } 
 };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    cb(body);
  }); 
}


const getAllCampaigns = (req, res) => {
  // this will call the getParsedInvestmentData, get uniq campaign keys and then 
  // look up each key, eventually returning an array of all of the campaign objects
  makeInvestmentDataServerRequest(investmentData => {
    let parsedData = JSON.parse(investmentData);
    let logs = parsedData["investment_request_logs"];
    let records = logs.split('\n');
    let campaigns = records
      .map(record => record.split(' '))
      .reduce((acc, record) => {
        // because object order is not guaranteed, need to find the index
        let index = record.findIndex(rec => rec.includes('campaign_id='));
        let campaignId = record[index].slice(12);
        // only add the campaignId if the acc does not have it already
        return acc.includes(campaignId) ? acc : [...acc, campaignId];
      }, [])
    res.send(campaigns);
  })
}


module.exports = {
  logger, 
  getInvestmentData, 
  getCampaignTerms, 
  getAllCampaigns, 
};