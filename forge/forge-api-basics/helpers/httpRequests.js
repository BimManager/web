/*  
** const options = {
**    hostname: 'developer.api.autodesk.com',
**    port: 443,
**    method: 'POST',
**    path: '/authentication/v1/authenticate',
**    headers: {
**      'Content-Type': 'application/x-www-form-urlencoded'
**    }
** };
*/

const https = require('https');

function makeHttpRequest(options, body = null) {
  console.log(options);
  return new Promise(function(resolve, reject) {
    const req = https.request(options, function(res) {
      let body = [];
      res.on('data', function(chunk) {
        body.push(chunk);
      });
      res.on('end', function() {
        resolve(Buffer.concat(body).toString());
      });
    });
    req.on('error', function(err) { reject(err); });
    if (body) req.write(body);
    req.end();
  });
}

function get(options) {
  return makeHttpRequest(options);
}

function post(options, body) {
  return makeHttpRequest(options, body);
}

module.exports = {
  get: get,
  post: post
};
