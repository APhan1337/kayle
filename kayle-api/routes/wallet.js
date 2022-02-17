// Import Express application object
var express = require("express");
// Use Express application object to get a Router object.
var router = express.Router();

// Import libraries
const axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const { HTTPMethod } = require("http-method-enum");

// Import modules
const rpcResponseConstants = require("../services/helpers/solanaRpcResponseConstants.js");
const tokenConverter = require("../services/helpers/converter.js");
const solOrLamportQueryChecker = require("../services/helpers/tokenQueryStringParser.js");
const clusterEndpoint = require("../services/helpers/rpcUrls.js");
const solanaRpcApiService = require("../services/solana_rpc_api/solanaRpcApiService.js");

// GET method route to retrieve requests from {{DOMAIN}}/account/balance
router.get("/balance", async function (req, res) {
  let balance = {
    lamport: 0,
    sol: 0,
  };
  let rpcMethod = "getBalance";
  // Access the provided 'pubkey' (wallet address) query parameters
  let params = [req.query.pubkey];
  let httpRequestMethod = HTTPMethod.POST;
  let rpcUrl = clusterEndpoint.getConnectionEndpoint(req.query.cluster);

  let rpcResponse = await solanaRpcApiService.getJsonRpcApi(
    rpcMethod,
    params,
    httpRequestMethod,
    rpcUrl
  );

  // 401. Axios Error.
  if (rpcResponse.success == rpcResponseConstants.SERVER_ERROR) {
    res.statusCode = StatusCodes.UNAUTHORIZED;
    res.json({ message: rpcResponse.body });
    return;
  }
  // 200.
  else if (rpcResponse.success == rpcResponseConstants.SUCCESS) {
    res.statusCode = StatusCodes.OK;
    balance.lamport = rpcResponse.body.result.value;
    balance.sol = parseFloat(
      tokenConverter.convertLamportToSol(rpcResponse.body.result.value)
    );
    res.json(balance);
    return;
  }
  // 400. Solana RPC API Error.
  else if (rpcResponse.success == rpcResponseConstants.CLIENT_ERROR) {
    res.statusCode = StatusCodes.BAD_REQUEST;
    res.json({ message: rpcResponse.body.message });
    return;
  }
});

router.post("/airdrop", async function (req, res) {
  let airdrop = {
    transactionSignature: "",
  };
  let rpcMethod = "requestAirdrop";
  let pubkey = req.query.recipient_address;
  let amount = solOrLamportQueryChecker.solOrLamport(
    req.query.sol,
    req.query.lamport
  );
  let params = [pubkey, parseFloat(amount)];
  let httpRequestMethod = HTTPMethod.POST;
  let rpcUrl = clusterEndpoint.getConnectionEndpoint(req.query.cluster);

  let rpcResponse = await solanaRpcApiService.getJsonRpcApi(
    rpcMethod,
    params,
    httpRequestMethod,
    rpcUrl
  );

  if (rpcResponse.success == rpcResponseConstants.SERVER_ERROR) {
    res.statusCode = StatusCodes.UNAUTHORIZED;
    res.json({ message: rpcResponse.body });
    return;
  } else if (rpcResponse.success == rpcResponseConstants.SUCCESS) {
    res.statusCode = StatusCodes.OK;
    airdrop.transactionSignature = rpcResponse.body.result;
    res.json(airdrop);
    return;
  } else if (rpcResponse.success == rpcResponseConstants.CLIENT_ERROR) {
    res.statusCode = StatusCodes.BAD_REQUEST;
    res.json({ message: rpcResponse.body.message });
    return;
  }
});

// Module exports the Router object.
module.exports = router;
