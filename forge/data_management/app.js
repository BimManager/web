const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const config = require("./config");

const oauthRouter = require("./routes/oauth");
const dataRouter = require("./routes/datamanagement");
const userRouter = require("./routes/user");

const app = express();

if (undefined == config.credentials.client_id
	|| undefined == config.credentials.client_secret) {
	console.log("FORGE_CLIENT_ID or FORGE_CLIENT_SECRET is not defined. Exiting...");
	return ;
}

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cookieSession({
	name: "forge-session",
	keys: ["forge_secure_key"],
	maxAge: 14 * 24 * 60 * 60 * 1000,
}));

app.use((req, res, next) => {
	res.status(404).end("404 Not Found");
});

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).end("500 Server Error");
});

app.listen(config.port, () => {
	console.log(`Listening on port ${config.port}`);
});

