const app = require('./server');
const socketIO = require('./socket.io')(app);

const server = socketIO.httpServer.listen(app.get('port'), () => {
  console.log('The server is listening on ' + app.get('port'));
});

server.on('error', (err) => {
  console.error(err);
});
