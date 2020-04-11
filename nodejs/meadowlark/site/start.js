const express = require("express");
const exphbs = require("express-handlebars");
const fortune = require("./lib/fortune.js");


const app = express();
const hbs = exphbs.create({ defaultLayout: "main" });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.set("port", process.env.PORT || 3000);

/* middleware to detect test=1 */
app.use((req, res, next) => {
    res.locals.showTests = app.get("env") !== "production" &&
	req.query.test === "1";
    next();
});

app.use(express.static(__dirname + "/public"));

app.get("/foo", (req, res, next) => {
    res.status(200);
    res.type("text/plain");
    //    res.send("foo");
    res.render("forms/bookform");
});

app.use("/createbook", (req, res, next) => {
    console.log("req.body");
    next();
});

app.get("/", (req, res, next) => {
/*    res.type("text/plain");
    res.status(200);
    res.send("home page");*/
    res.render("home");
});

app.get("/about", (req, res, next) => {
/*    res.type("text/plain");
    res.status(200);
    res.send("about page");*/
//    res.render("about");
    res.render("about", {
	fortune: fortune.getFortune(),
	pageTestScript: "/qa/tests-about.js"
    });
});

app.get("/react", (req, res, next) => {
    res.status(200);
    res.sendFile(__dirname + "/views/chooser.html");
});

app.get("/tours/hood-river", (req, res) => {
    res.render("tours/hood-river");
});

app.get("/tours/request-group-rate",
	(req, res) => {
	    res.render("tours/request-group-rate");
	});
    

/* custom 404 page */
app.use((req, res) => {
    //    res.type("text/plain");
    //    res.send("404 - Not Found");
    res.status(404);
    res.render("404");
});

/* custom 500 page */
app.use((err, req, res, next) => {
    //    res.type("text/plain");
    //    res.send("500 - Server Error");
    console.log(err.stack);
    res.status(500);
    res.render("500");
});

app.listen(app.get("port"), () => {
    console.log("Express started on http://localhost:" +
		app.get("port") + "; press Ctrl-C to terminate.")
});
