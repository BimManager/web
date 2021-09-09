const path = require('path');
const http = require('http');
const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use((req, res, next) => {
  const statusCode = 404;
  const err = new Error(http.STATUS_CODES[statusCode]);
  err.statusCode = statusCode;
  next(err);
});

app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500;
  res.statusMessage = http.STATUS_CODES[res.statusCode];
  res.send({
    statusCode: res.statusCode,
    statusMessage: res.statusMessage,
    error: 'development' === app.get('env') ? err : {}
  });
});
                            
const server = http.createServer(app);
const boot = () => {
  server.listen(app.get('port'), () => {
    console.info('The server is listening on port ' + app.get('port'));
  });
};
const shutdown = () => {
  server.close();
};

if (require.main === module) {
  boot();
} else {
  console.info('The server is running as a module');
  module.exports.boot = boot;
  module.exports.shutdown = shutdown;
  module.exports.port = app.get('port');
}
