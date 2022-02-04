const conversionFactor = 0.000000001; // {sol} * conversionFactor = # of lamports

function convertLamportToSol(lamport) {
  let sol = lamport * conversionFactor;
  return sol;
}

function convertSolToLamport(sol) {
  let lamport = sol / conversionFactor;
  return lamport;
}

module.exports = { convertLamportToSol, convertSolToLamport };
