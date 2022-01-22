var metaplex = require('@metaplex/js');
var metadata = require('@metaplex-foundation/mpl-token-metadata');
var express = require('express');
var router = express.Router();

const connection = new metaplex.Connection('devnet');
// const tokenPublicKey = 'Gz3vYbpsB2agTsAwedtvtTkQ1CG9vsioqLW3r9ecNpvZ';

router.get('/', function(req, res, next) {
	var tokenPublicKey = req.query.publicKey;

	const run = async () => {
		try {
			const ownedMetadata = await metadata.Metadata.load(connection, tokenPublicKey);
			res.json(ownedMetadata);
		  } catch {
			console.log('Failed to fetch metadata');
		  }
	};

	run();
});

module.exports = router;
