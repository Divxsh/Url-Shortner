const express = require("express");
const router = express.Router();
const Url = require("../models/shortUrlModel");

router.get("/:shortUrlCode", async (req, res) => {
	try {
		// find a document match to the code in req.params.code
		const data = await Url.findOne({
			where: {
				urlCode: req.params.shortUrlCode,
			},
		});

		if (data) {
			// when valid we perform a redirect
			data.click++;
			data.save();
			res.redirect(data.longUrl);
		} else {
			// else return a not found 404 status
			res.status(404).json("No URL Found");
		}
	} catch (err) {
		// exception handler
		console.error(err);
		res.status(500).json("Server Error");
	}
});

module.exports = router;
