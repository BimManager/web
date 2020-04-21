const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

const Handler = require('./handler');

const host = '127.0.0.1';
const port = 3000 || process.env.PORT;

const handler = new Handler();

handler.add('/', (req, res) => {
	res.end('home');
});

handler.add('/foo', (req, res) => {
	res.end('other path');
});

const server = http.createServer((req, res) => {
	handler.get(req, res);
/*	if ('/' == urlParts.pathname) {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('Howdy!');
	}
	else {
		res.writeHead(404);
		res.end('404 Not Found');
	}*/
});

server.listen((host, port), () => {
	console.log('listerning on port %d...', port);
});
