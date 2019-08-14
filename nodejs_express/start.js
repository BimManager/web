const http = require("http");
const fs = require("fs");

function serveStaticFile(res, path, contentType, responseCode) {
    fs.readFile(__dirname + path, (err, data) => {
	if (err) {
	    res.writeHead(500, { "Content-Type": "text/plain" });
	    res.end("500 - Internal Error");
	} else {
	    res.writeHead(responseCode, { "Content-Type": contentType });
	    res.end(data);
	}
    });
}

http.createServer((req, res) => {
    let path = req.url.replace(/\/?(?:\?.*)?$/, "");
    switch (path)
    {
	case "":
        //res.writeHead(200, { "Content-Type": "text/plain" });
	    //res.end("Main page");
	serveStaticFile(res,"/public/home.html", "text/html", 200);
        break ;
        case "/about":
        //res.writeHead(200, { "Content-Type": "text/plain" });
        //res.end("About page");
	serveStaticFile(res, "/public/about.html", "text/html", 200);
        break ;
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not Found");
            break ;
    }
}).listen(3000);
console.log("Server has started listening on port 3000");
