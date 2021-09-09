process.on('message', (msg) => {
  console.log('Parent said: ' + msg);
  process.send('I am doing fine...');
});
                                
