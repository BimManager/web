const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const express = require('express');

const config = require('./config');

if (!config.credentials.client_id) {
  console.log('FORGE_CLIENT_ID is not defined. Exiting ... ');
  exit(1);
} else if (!config.credentials.client_secret) {
  console.log('FORGE_CLIENT_SECRET is not defined. Exiting ... ');
  exit(1);
} else if (!config.credentials.callback_url) {
  console.log('FORGE_CALLBACK_URL is not defined. Exiting ... ');
  exit(1);
}

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieSession({
  name: 'forge_session',
  keys: ['forge_secure_key'],
  maxAge: 60 * 60 * 1000 // 1 hour
}));

//app.use('/api', require('./routes/designAutomation'));

app.use((req, res, next) => {
  res.statusCode = 404;
  res.json({ message: 'Not Found' });
});

module.exports = app;


