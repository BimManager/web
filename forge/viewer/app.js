const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('app');

const config = require('./config');

const oauthRouter = require('./routes/oauth');
const ossRouter = require('./routes/oss');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send('home'); });
app.use('/api/forge/oauth', oauthRouter);
app.use('/api/forge/oss', ossRouter);
app.all('/api/forge/modelderivative', require('./routes/modelderivative'));
app.use((req, res) => {
	res.send('404 Not Found');
});
app.use((err, req, res, next) => {
	debug(err);
	res.status(err.statusCode).json(err);
});

app.listen(config.port, () => {
	debug('listening on port ' + config.port);
});

