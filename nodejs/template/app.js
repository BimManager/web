/*
** how to setup an http server using express:
** 1. set up folders
** 2. create package.json & package-lock.json 
** 3. npm install
** 4. app.js
** 4.1 require dependencies
** 4.2 configure settings
** 4.3 connect to database
** 4.4 define middleware (function(req, res, next))
** 4.5 define routes
** 4.6 start the server
** 4.7 spawn workers with clusters
*/

const express = require('express');
const http = require('http');
const path = require('path');

const config = require('./config');

const app = express();

app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

/* send a static html */
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

/* render a jade file */
app.get('/jade', (req, res) => {
    res.render('index');
});

app.get('/error', (req, res, next) => {
	next(new Error());
});

app.use((req, res, next) => {
	res.status(404)
		.type('text/html')
		.send('<h1>404 Not Found</h1>');
});

app.use((err, req, res, next) => {
	res.status(500)
		.type('text/html')
		.send('<h1>500 Server Error</h1>');
});

http
    .createServer(app)
    .listen(app.get('port'), () => {
	console.log(`listening on port ${app.get('port')}...`);
    });
