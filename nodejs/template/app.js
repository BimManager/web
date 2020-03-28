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

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

/* send a static html */
app.get('/', (req, res) => {
    res.sendfile('index.html');
});

/* render a jade file */
app.get('/jade', (req, res) => {
    res.render('index');
});

http
    .createServer(app)
    .listen(app.get('port'), () => {
	console.log(`listening on port ${app.get('port')}...`);
    });
