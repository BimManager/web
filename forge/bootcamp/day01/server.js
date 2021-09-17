const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('app');

const config = require('./config');

const oauthRouter = require('./routes/oauth');
const ossRouter = require('./routes/oss');
const modelderivativeRouter = require('./routes/modelderivative');

if (undefined == config.credentials.client_id
	|| undefined == config.credentials.client_secret) {
	console.log(`FORGE_CLIENT_ID or FORGE_CLIENT_SECRET is not defined.`);
	return ;
}

const app = express();

app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept');
    next();
});

//app.get('/', (req, res) => { res.send('home'); });
app.use('/api/forge/oauth', oauthRouter);
app.use('/api/forge/oss', ossRouter);
app.use('/api/forge/modelderivative', modelderivativeRouter);
app.use((req, res) => {
	res.send('404 Not Found');
});
app.use((err, req, res, next) => {
	debug(err);
	res.status(err.statusCode).json(err);
});

app.listen(config.port, () => {
    console.log('listening on port ' + config.port);
	debug('listening on port ' + config.port);
});

