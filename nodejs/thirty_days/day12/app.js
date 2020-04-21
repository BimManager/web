const path = require("path");
const assert = require("assert");

const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const config = require("./config");
const hashing = require("./controllers/hashing");

const app = express();
const mongoClient = new MongoClient(config.mongoDB);

/*mongoClient.connect((err) => {
	assert.equal(null, err);
	console.log("connection has been established");
	const db = mongoClient.db("local_library");
	const genres = db.collection("genres");
	genres.find({}).toArray((err, genre_list) => {
		assert.equal(null, err);
		console.log(genre_list);
	});
	mongoClient.close();
});*/

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.redirect("/index.html");
});

app.post("/sign_up", (req, res) => {
	console.log(req.body);
	const data = {
		name: req.body.name,
		email: req.body.email,
		password: hashing.getHmac(req.body.password, req.body.phone),
		phone: req.body.phone
	};
	mongoClient.connect((err) => {
		assert.equal(null, err);
		const db = mongoClient.db("users");
		db.collection("detail").insertOne(data, (err, result) => {
			assert.equal(null, err);
			console.log(result);
		});
	});
	res.redirect("success.html");
});

app.use((req, res, next) => {
	res.writeHead(404);
	res.end("404 Not Found");
});

app.use((err, req, res, next) => {
	res.writeHead(500);
	res.end("500 Server Error");
	console.log(err);
});

app.listen(config.port, () => {
	console.log("listening on port " + config.port);
});

