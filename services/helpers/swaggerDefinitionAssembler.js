var common = require("../../common");
var config = common.config();

function getSwaggerJson() {
  let swaggerDefinition = require("../../swagger.base.json");
  swaggerDefinition.host = config.swagger.host;
  return swaggerDefinition;
}

module.exports = { getSwaggerJson };
