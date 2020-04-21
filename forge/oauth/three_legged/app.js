const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

const host = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	const urlParts = url.parse(req.url);
	if ('/' == urlParts.pathname) {
		fs.readFile('./public/index.html', (err, data) => {
			if (err) { console.error(err); res.writeHead(500); res.end('500 Server Error'); }
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(data);
		});
	}
	else if ('/oauth' == urlParts.pathname) {
		const code = urlParts.query.split('=')[1];
		console.log(code);
		res.end('Done');
	}
	else {
		res.writeHead(404);
		res.end('404 Not Found');
	}
});

server.listen((host, port), () => {
	console.log('listening on port ' + port);
});
