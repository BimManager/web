const http = require('http');
const qs = require('querystring');
const url = require('url');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  console.log(req.url + ' ' + req.method);
  console.log(url.parse(req.url));
  console.log('host: ' + req.headers.host);
  console.log('headers: ' + JSON.stringify(req.headers));
  console.log('raw headers: ' + req.rawHeaders);
  console.log('http version: ' + req.httpVersion);
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify({ message: 'Thank you!' }));
  res.end();
});

server.listen(port, () => {
  console.info('The server is listening on PORT ' + port);
});


// http.METHODS
// http.STATUS_CODES[404] === 'Not Found'
// req is http.IncomingMessage extends stream.Readable
// GET / HTTP/1.1
// req.method => 'GET'
// req.url => '/'
// req.headers => { host: '127.0.0.1:3000', accept: '*/*' }
// req.httpVersion => '1.1'
// req.rawHeaders => [ 'user-agent', 'curl/7.74.0', ... ]
// req.socket => stream.Duplex
// req.statusCode => 200
// req.statusMessage => 'OK'
