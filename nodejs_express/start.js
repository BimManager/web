const http = require("http");
//const http = import("http");
//import {createServer} from "http";

http.createServer((req, res) => {
    let path = req.url.replace(/\/?(?:\?.*)?$/, "");
    switch (path)
    {
        case "":
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Main page");
            break ;
        case "/about":
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("About page");
            break ;
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not Found");
            break ;
    }
}).listen(3000);
console.log("Server has started listening on port 3000");