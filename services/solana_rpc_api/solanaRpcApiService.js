const axios = require("axios");
const constants = require("../helpers/solanaRPCResponseConstants.js");

/**
 * Make HTTP Method Request with Axios
 * @param {string} method - The JSON RPC API method to be invoked.
 * @param {array} params - A JSON array of ordered parameter values.
 * @param {string} request - HTTP Request Method.
 * @param {string} url - Solana Cluster RPC Endpoint.
 */
async function getJsonRpcApi(method, params, request, url) {
  let rpcResponse = {
    success: constants.SUCCESS,
    body: null,
  };
  // Convert JSON object to JSON string for config.
  let data = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: method,
    params: params,
  });

  // Create relevant config to pass to axios.
  let config = {
    method: request,
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  // Make POST request with Axios and return response.
  await axios(config)
    .then(function (response) {
      if (response.data.error == undefined) {
        rpcResponse.success = constants.SUCCESS;
        rpcResponse.body = response.data;
      } else {
        rpcResponse.success = constants.CLIENT_ERROR;
        rpcResponse.body = response.data.error;
      }
    })
    .catch(function (error) {
      rpcResponse.success = constants.SERVER_ERROR;
      rpcResponse.body = error.message;
    });

  return rpcResponse;
}

module.exports = { getJsonRpcApi };
