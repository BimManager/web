/*
 *	start.js
 */

const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3000;
const config = require("./config");
if (config.credentials.client_id == null
    || config.credentials.client_secret == null)
    {
	console.error("client_id or client_secret is missing.");
	return ;
    }

let app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "50mb" }));
app.use("/api/forge/oauth", require("./route/oauth"));
app.use("/api/forge/oss", require("./route/oss"));
app.use("/api/forge/modelderivative", require("./route/modelderivative"));
app.use((err, req, res, next) =>
    {
	console.error(err);
	res.status(err.statusCode).json(err));
	});
app.listen(PORT, () => { console.log(`Server is listenining on ${PORT}`); });
