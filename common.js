var env = require("./env.json");

exports.config = function () {
  if (process.env.NODE_ENV != undefined) {
    process.env.NODE_ENV = process.env.NODE_ENV.trim();
  }
  var node_env = process.env.NODE_ENV || "development";
  return env[node_env];
};
