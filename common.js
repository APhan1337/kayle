var env = require("./env.json");

exports.config = function () {
  var node_env = process.env.NODE_ENV || "development";
  env[node_env].swaggerOptions = env.swaggerOptions;
  return env[node_env];
};
