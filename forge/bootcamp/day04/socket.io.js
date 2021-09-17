module.exports = (app) => {
  const httpServer = require('http').createServer(app);
  const io = require('socket.io')(httpServer);
  app.io = io;
  const nbClients = 0;
  io.on('connection', (socket) => {
    ++nbClients;

    io.on('disconnection', () => {
      --nbClients;
    });
  });
  return {
    httpServer: httpServer,
    io, io
  };
};
