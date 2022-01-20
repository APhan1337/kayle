var metaplex = require('@metaplex/js');
var metadata = require('@metaplex-foundation/mpl-token-metadata');
var express = require('express');
var router = express.Router();

const connection = new metaplex.Connection('devnet');
// const tokenPublicKey = 'Gz3vYbpsB2agTsAwedtvtTkQ1CG9vsioqLW3r9ecNpvZ';



router.get(['/', '/:metadata'], function(req, res, next) {
	console.log(JSON.stringify(req.query));
	var tokenPublicKey = req.query.tokenPublicKey;

	const run = async () => {
		console.log("Running...");
		console.log(tokenPublicKey);
		try {
			const ownedMetadata = await metadata.Metadata.load(connection, tokenPublicKey);
			console.log(ownedMetadata);
			res.json(ownedMetadata);
		  } catch {
			console.log('Failed to fetch metadata');
			res.render('error');
		  }
	};

	run();
});

module.exports = router;