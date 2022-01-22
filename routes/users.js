var express = require('express');
var router = express.Router();

var erwin = {
	"id": 13,
	"age": null,
	"photo_id": "https://res.cloudinary.com/erwin-json/image/upload/v1631740732/erwin-smith_dmbc1f.png",
	"branch": "scouts",
	"height_cm": 188,
	"name": {
		"first": "Erwin",
		"last": "Smith"
	},
	"expeditions": [
		{
			"name": "Find Land",
			"time": "2022-01-18T01:35:03.552Z"
		}
	]
};

/* GET users listing. */
router.get('/', function(req, res, next) {
	let data = erwin;
  	res.json(data);
});

/* UPDATE user */
/* CREATE user */
/* DELETE user */

module.exports = router;