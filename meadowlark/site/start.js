const express = require("express");

const app = express();

app.set("port", process.env.PORT || 3000);

/* home page */
app.get("/", (req, res, next) => {
    res.type("text/plain");
    res.status(200);
    res.send("home page");
});

/* about page */
app.get("/about", (req, res, next) => {
    res.type("text/plain");
    res.status(200);
    res.send("about page");
});

/* custom 404 page */
app.use((req, res) => {
    res.type("text/plain");
    res.status(404);
    res.send("404 - Not Found");
});

/* custom 500 page */
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.type("text/plain");
    res.status(500);
    res.send("500 - Server Error");
});

app.listen(app.get("port"), () => {
    console.log("Express started on http://localhost:" +
		app.get("port") + "; press Ctrl-C to terminate.")
});
