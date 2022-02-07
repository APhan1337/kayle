const { StatusCodes } = require("http-status-codes");
const metadataService = require("../services/metadata/metadataService.js");

var express = require("express");
var router = express.Router();

router.get("/", async function (req, res) {
  let solanaCluster = req.query.cluster;
  let tokenPublicKey = req.query.publicKey;

  const ownedMetadata = await metadataService.getMetadataByPublicKey(
    solanaCluster,
    tokenPublicKey
  );

  if (!ownedMetadata.success) {
    res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    res.json(ownedMetadata.message);
    return;
  }

  res.json(ownedMetadata.value);
});

module.exports = router;
