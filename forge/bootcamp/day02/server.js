const path = require('path');
const express = require('express');
const bodyParse = require('body-parser');
const cookieSession = require('cookie-session');

const config = require('./config');

if (!config.credentials.client_id) {
  console.log('please define FORGE_CLIENT_ID');
  process.exit(1);
} else if (!config.credentials.client_secret) {
  console.log('please define FORGE_CLIENT_SECRET');
  process.exit(1);n
} else if (!config.credentials.callback_url) {
  console.log('please define FORGE_CALLBACK_URL');
  process.exit(1);
}

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParse.json({ limit: '50mb' }));
app.use(cookieSession({
  name: 'forge_session',
  keys: ['forge_secure_key'], // encrypts cookies
  maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days
}));

app.use('/api/forge', require('./routes/oauth'));
app.use('/api/forge', require('./routes/data-management'));
app.use('/api/forge', require('./routes/user'));

app.use((req, res, next) => {
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.statusCode = req.statusCode || 500;
  res.json({ error: err });
});

app.listen(app.get('port'), () => {
  console.info('The server is listening on port ' + app.get('port'));
});


