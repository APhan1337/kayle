const tokenConverter = require("./converter.js");

function solOrLamport(sol, lamport) {
  // Checks if SOL or Lamport query string exists.
  if (sol === undefined && lamport !== undefined) {
    console.log(typeof lamport);
    return lamport;
  } else if (sol !== undefined && lamport === undefined) {
    console.log(typeof tokenConverter.convertSolToLamport(parseFloat(sol)));
    return tokenConverter.convertSolToLamport(parseFloat(sol));
  }
}

module.exports = { solOrLamport };
