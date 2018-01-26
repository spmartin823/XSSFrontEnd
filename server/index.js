const express = require('express');
let path = require('path');
const bodyParser = require('body-parser');
const { 
        logger,   
        addMessage,
        getAllMessages 
      } = require('./util')

const app = express();

// Middleware
app.use(logger);
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/dist`));

// Routes 
app.post('/api/addMessage', addMessage);
app.get('/api/getAllMessages', getAllMessages);

// Fallback route for react router
app.get('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`) );

let port = process.env.port || 3000;
app.listen(port, () => console.log(`Now listening on ${port}`));