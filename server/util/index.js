const request = require('request');
const { PARSE_API_KEY } = require('../../config/API_KEY')


const logger = (req, res, next) => {
  console.log(`${req.method} request received at ${req.url}`);
  next();
};


const addMessage = (req, res) => {
  addMessageServerRequest(req.body, messageStatus => {
    res.send(messageStatus)
  })
}

const addMessageServerRequest = (body, cb = () => {}) => {
  console.log('this is the body in the addMessageServerRequest', body)
  var options = { 
    method: 'POST',
    url: 'http://parse.nyc.hackreactor.com/chatterbox/classes/messages',
    headers: { 
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/javascript',
      'X-Parse-REST-API-Key': 'ed8204bd6cf2d93788258e1804415212609d218f',
      'X-Parse-Application-Id': '39715d2bec12f9dc1df3e125e13298f475e7e68f' },
    body: JSON.stringify(body) 
  };

  request(options, function (error, response, body) {
    if (error) console.error(error);
    cb(body);
  });
}


const getAllMessages = (req, res) => {
  let order = req.params.order || '-createdAt'
  console.log('this is the order', order)
  getAllMessagesServerRequest(order, (data) => {
    res.send(data)
  })
}


const getAllMessagesServerRequest = (order, cb = () => {}) => {
  // helper for getInvestmentData and getAllCampaigns
  var options = { 
    method: 'GET',
    url: `http://parse.nyc.hackreactor.com/chatterbox/classes/messages?order=${order}`,
    headers: { 
        'Cache-Control': 'no-cache',
        'X-Parse-REST-API-Key': 'ed8204bd6cf2d93788258e1804415212609d218f',
        'X-Parse-Application-Id': '39715d2bec12f9dc1df3e125e13298f475e7e68f' 
      } 
  };
  request(options, function (error, response, body) {
    if (error) console.error(error);
    cb(body);
  });
}


module.exports = {
  logger, 
  addMessage,
  getAllMessages, 
};