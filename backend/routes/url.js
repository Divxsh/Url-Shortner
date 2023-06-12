// packages needed in this file
const express = require("express");
const validUrl = require("valid-url");
const shortid = require("short-id");
const shortUrlModel = require("../models/shortUrlModel");

// creating express route handler
const router = express.Router();

// The API base Url endpoint
const baseUrl = "http:localhost:5000";

router.get("/", async (req, res) => {
	const Urls = await shortUrlModel.findAll();
	res.render("index", { shortUrls: Urls });
});

router.post("/shrinker", async (req, res) => {
	const { longUrl } = req.body; // destructuring the longUrl from req.body.longUrl

	if (!validUrl.isUri(baseUrl)) {
		return res.status(401).json("Invalid base URL");
	}

	const urlCode = shortid.generate();

	if (validUrl.isUri(longUrl)) {
		try {
			let url = await shortUrlModel.findOne({
				where: { longUrl },
			});

			if (url) {
				res.redirect("/");
				// res.json(url);
			} else {
				// join the generated short code the the base url
				const shortUrl = baseUrl + "/" + urlCode;

				// invoking the Url model and saving to the DB
				url = new shortUrlModel({
					longUrl,
					shortUrl,
					urlCode,
				});
				await url.save();
				// res.json(url);
				res.redirect("/");
			}
		} catch (err) {
			console.log(err);
			res.status(500).json("Server Error");
		}
	} else {
		res.status(401).json("Invalid longUrl");
	}
});

router.post("/delete", async (req, res) => {
	const { urlCode } = req.body;
	console.log("urlCode", urlCode);
	try {
		const urlData = await shortUrlModel.findOne({
			where: { urlCode },
		});
		await urlData.destroy();
	} catch (e) {
		console.log({
			msg: "Delete Route : Something went wrong",
			error: e,
		});
	}
	res.redirect("/");
});

module.exports = router;
