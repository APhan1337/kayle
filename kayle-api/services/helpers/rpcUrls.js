const DEVNET_CONNECTION_ENDPOINT = "https://api.devnet.solana.com";
const TESTNET_CONNECTION_ENDPOINT = "https://api.testnet.solana.com";
const MAINNET_CONNECTION_ENDPOINT = "https://api.mainnet-beta.solana.com";
const PROJECT_SERUM_CONNECTION_ENDPOINT = "https://solana-api.projectserum.com";

function getConnectionEndpoint(cluster) {
  let endpoint = "";
  switch (cluster) {
    case "devnet":
    case DEVNET_CONNECTION_ENDPOINT:
      endpoint = DEVNET_CONNECTION_ENDPOINT;
      break;
    case "testnet":
    case TESTNET_CONNECTION_ENDPOINT:
      endpoint = TESTNET_CONNECTION_ENDPOINT;
      break;
    case "mainnet":
    case MAINNET_CONNECTION_ENDPOINT:
      endpoint = MAINNET_CONNECTION_ENDPOINT;
      break;
    case "projectserum":
    case PROJECT_SERUM_CONNECTION_ENDPOINT:
      endpoint = PROJECT_SERUM_CONNECTION_ENDPOINT;
      break;
    default:
      console.log("Invalid cluster.");
  }
  return endpoint;
}

module.exports = { getConnectionEndpoint };
