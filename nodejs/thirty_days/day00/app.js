const fs = require('fs');
const path = require('path');
const http = require('http');

const host = '127.0.0.1';
const port = 3000;


/* How to serve a string */
/*const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Serving a string');
});*/

/* How to serve an html file */
const server = http.createServer((req, res) => {
	//fs.readFile(path.join(__dirname, 'public') + '/index.html', (err, data) => {
	fs.readFile('../../../ajax/index.html', (err, data) => {
		if (err) {
			res.writeHead(404);
			res.end('<h1>Error reading a file</h1>');
			return ;
		}
		res.writeHead(200, { 'Content-Type': 'text/html',
						 'Content-Length': Buffer.byteLength(data) });
		res.end(data);
	});
});

/* How to serve a json */
/*const server = http.createServer((req, res) => {
	const data = {
		content: 'foo',
		meta: 'n/a'
	};
	const json = JSON.stringify(data);
	res.writeHead(200, {
		'Content-Type': 'application/json',
		'Content-Length': Buffer.byteLength(json) });
	res.end(json);
});*/

/* How to serve a pdf file */
/*const server = http.createServer((req, res) => {
	fs.readFile(path.join(__dirname, 'public') + '/en.subject.pdf', (err, data) => {
		if (err) {
			res.writeHead(404).end('There appears to be an error reading the pdf file.');
			return ;
		}
		res.writeHead(200, 'Foo', { 'Content-Type': 'application/pdf' });
		res.end(data);
	});
});*/

/* How to serve a mp3 file */
/*const server = http.createServer((req, res) => {
	const mp3path = path.join(__dirname, 'public') + '/hancock.mp3';
	console.log(mp3path);
	if (fs.existsSync(mp3path)) {
		res.writeHead(200, { 'Content-Type': 'audio/mp3' });
		let stream = fs.createReadStream(mp3path);
		stream.pipe(res);
	}
	});*/

server.listen((host, port), () => {
	console.log(`listening on port ${port}`);
});


