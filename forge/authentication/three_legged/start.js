const http = require("http");
const fs = require("fs");

const port = 3000;

function serveStaticFile(res, path, contentType, responseCode) {
    if (!responseCode)
        responseCode = 200;
    fs.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.end("500 - Internal Error");
            return ;
        }
        res.writeHead(responseCode, {"Content-Type": contentType});
        res.end(data);
    });
};

http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/plain"});
    serveStaticFile(res, "/public/auth.html", "text/html");
}).listen(port);

let authMeBtn = document.getElementById("authorizeMe");
authMeBtn.onlick = () => { console.log("Authorize Me!"); };