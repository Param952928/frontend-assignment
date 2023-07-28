// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.get('/api/fetchStockData', (req, res) => {
const polygonApiKey = 'Cuy2hjZ5kQQo23SzedEcN8FMbAnVYTaU';

const stockSymbol = 'AAPL';
const date = '2023-07-26';

const apiUrl = `https://api.polygon.io/v1/open-close/${stockSymbol}/${date}?apiKey=${polygonApiKey}`;


axios.get(apiUrl)
  .then(response => {
    console.log("data", response.data)
    
    // Extract trade statistics from the response
    const {open, high, low, close, volume } = response.data;

    // Log the trade statistics
    console.log('Open Price:', open);
    console.log('High Price:', high);
    console.log('Low Price:', low);
    console.log('Close Price:', close);
    console.log('Volume:', volume);
  })
  .catch(error => {
    console.error('Error fetching trade statistics:', error.message);
  });

    res.sendStatus(200);
    res.send({open, high, low, close, volume})
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));