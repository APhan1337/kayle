const conversionFactor = 0.000000001; // {sol} * conversionFactor = # of lamports

function convertLamportToSol(lamport) {
  let sol = lamport * conversionFactor;
  return sol.toFixed(5);
}

function convertSolToLamport(sol) {
  let lamport = sol / conversionFactor;
  return lamport.toFixed(5);
}

module.exports = { convertLamportToSol, convertSolToLamport };
