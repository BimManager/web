// Copyright 
// Author: kkozlov
// index.js

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); 

const queryNameLocation = (req) => {
    const query = req.query;
    console.log(query);
    let name = "N/A";
    let location = "N/A";
    if (Object.keys(query).length == 2) {
	name = query.name;
	location = query.location;
    }
    return ({ name: name, location: location });
};

const logger = (req, res, next) => {
    console.log(`Received request for ${req.url} at ${new Date()}`);
    next();
};

const nameFinder = (req, res, next) => {
    const name = req.query.name;
    if (name)
	req.username = name.toUpperCase();
    else
	req.username = "Guest";
    next();

};

const greeter = (req, res, next) => {
    res.status(200).type("html");
    res.write("Hello, " + req.username);
    next();
};

const adminName = (req, res, next) => {
    req.username = "Admin";
    next();
};

const commonRoute = express.Router();
commonRoute.use(logger);

app.use(commonRoute);

app.get("/welcome", nameFinder, greeter,
	(req, res) => { res.end(); });

app.get("/admin", adminName, greeter,
	(req, res) => { res.end(); });

app.get("/", (req,res) => {
    /* to request a header field */
    console.log(req.get("User-Agent")); 
    res.status(200);
//    res.type("text/plain");
    res.type("text/html");
    const data = queryNameLocation(req);
    res.write(`<h1>Hello, ${data.name} from ${data.location}!</h1>`);
    res.end();
//    res.send("Home page");
});

app.get("/about", (req, res, next) => {
    res.status(200);
    res.type("text/plain");
    res.send("About page");
});

app.use(express.static("public"));

const handleFormMethod1 = (req, res) => {
    const name = req.body.username;
    const animals = req.body.animal;
    res.type("text/html");
    res.status(200);
    res.write(`${name} likes ${animals}.`);
    res.end();
};

const handleFormMethod2 = (req, res) => {
    const name = req.body.username;
    const animal = req.body.animal;
    const animals = [].concat(animal);
    console.log(animals);
    res.write(`<p>Hello, ${name}, nice to meet you.</p>`);
    res.write("<p>Here are the animals that you like:</p>");
    res.write("<ul>");
    animals.forEach((animal) => {
	res.write(`<li>${animal}</li>`);
    });
    res.write("<p><a href=form.html>Back to Form</a></p>");
    res.end();
};

const handleFormUsingEJS = (req, res) => {
    const user = req.body.username;
    const animals = [].concat(req.body.animal);
    console.log(animals);
    res.render("showAnimals", { username: user, animals: animals });
};

app.post("/handleForm", (req, res) => {
    //    handleFormMethod1(req, res);
    //    handleFormMethod2(req, res);
    handleFormUsingEJS(req, res);
});

app.get("/name/:userName/location/:userLocation",
	(req, res) => {
	    console.log(req.params);
	    const name = req.params.userName;
	    const location = req.params.userLocation;
	    if (name && location) {
		res.type("text/html");
		res.send(`<h2> Wotcha, ${name} who comes from ${location}`);
	    }
	});


app.use(/* default */ (req, res) => {
    res.status(404).send("Not Found!");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
