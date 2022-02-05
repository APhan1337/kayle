// Import Express application object
var express = require("express");
// Use Express application object to get a Router object.
var router = express.Router();

const axios = require("axios");
const tokenConverter = require("../services/helpers/converter.js");

// GET method route to retrieve requests from {{DOMAIN}}/account/balance
router.get("/balance", function (req, res) {
  // Access the provided 'pubkey' (wallet address) query parameters
  let params = req.query.pubkey;

  // Convert JSON object to JSON string for config.
  let data = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "getBalance",
    params: [params],
  });

  // Create relevant config to pass to axios.
  let config = {
    method: "post",
    url: "https://api.devnet.solana.com",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  // Make POST request with Axios.
  axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      let balanceLamport = response.data.result.value;
      console.log(balanceLamport);
      let balanceSol = tokenConverter.convertLamportToSol(balanceLamport);
      console.log(balanceSol);
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get("/airdrop", function (req, res) {
  let pubkey = req.query.recipient_address;
  let amount = req.query.lamports;

  let data = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "requestAirdrop",
    params: [pubkey, Number(amount)],
  });

  let config = {
    method: "post",
    url: "https://api.devnet.solana.com",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Module exports the Router object.
module.exports = router;
