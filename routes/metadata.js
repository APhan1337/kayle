var express = require("express");
var router = express.Router();

const metadataService = require("../services/metadata/metadataService.js");

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
  res.json(ownedMetadata);
});

module.exports = router;
