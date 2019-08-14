const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html"});
    let url = req.url;
    if (url == "/")
        res.end(`Hello, World!" ${__dirname} ${req.url}`);
    else if (url == "/about")
    {
        fs.readFile("index.html", "utf8", (err, data) => {
            if (err) {
                console.log(err);
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
        })
        //res.end("About");
    }

}).listen(3000);