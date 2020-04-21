const express = require("express");

const config = require("../config");
const { OAuth } = require("./common/oauth");

const router = express.Router();

router.get("/callback/oauth", async (req, res, next) => {
	const { code } = req.query;
	const oauth = new OAuth(req.session);
	try {
		await oauth.setCode(code);
		res.redirect("/");
	}
	catch(err) {
		next(err);
	}
});

router.get("/oauth/url", (req, res) => {
	const url = "https://developer.api.autodesk.com"
		  + "/authentication/v1/authorize?response_type=code"
		  + "&client_id=" + config.credentials.client_id
		  + "&redirect_uri" + config.credentials.callback_url
		  + "&scope=" + config.scopes.internal.join(' ');
	res.end(url);
});

router.get("/signout", (req, res) => {
	req.session = null;
	res.redirect("/");
});

router.get("/oauth/token", async (req, res, next) => {
	const oauth = new OAuth(req.session);
	if (!oauth.isAuthorized()) {
		res.status(401).end();
		return ;
	}
	try {
		const accessToken = await oauth.getPublicToken();
		res.json(acessToken);
	}
	catch(err) {
		next(err);
	}
});

module.exports = router;
