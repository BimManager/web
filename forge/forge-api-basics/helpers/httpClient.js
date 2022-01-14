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

function _makeHttpRequest(options, body = null) {
  console.log(options);
  if (body) console.log(body);
  return new Promise(function(resolve, reject) {
    const req = https.request(options, function(res) {
      let body = [];
      res.on('data', function(chunk) {
        body.push(chunk);
      });
      res.on('end', function() {
        res.body = Buffer.concat(body).toString();
        resolve(res);
        //resolve(Buffer.concat(body).toString());
      });
    });
    req.on('error', function(err) { reject(err); });
    if (body) req.write(body);
    req.end();
  });
}

module.exports = {
  makeHttpRequest : _makeHttpRequest
};
