const { StatusCodes } = require("http-status-codes");
const metadataService = require("../services/metadata/metadataService.js");

var express = require("express");
var router = express.Router();

/**
 * @swagger
 * /metadata:
 * 	get:
 *		description: Retrieve the metadata of a token by its public key.
 */
router.get("/", async function (req, res, next) {
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
