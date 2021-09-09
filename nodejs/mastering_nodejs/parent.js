const path = require('path');
const cp = require('child_process');

const child = cp.fork(path.join(__dirname, 'child.js'));
child.on('message', (msg) => {
  console.log('Child said: ' + msg);  
});
child.send('How is it going, kid?');
