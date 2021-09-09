const http = require('http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

describe('Unit tests', () => {
  before(() => server.boot());
  
  it('should return 200 on making GET to /', (done) => {
    makeHttpRequest({
      hostname: 'localhost',
      port: server.port,
      path: '/',
      method: 'GET'
    })
      .then((res) => {
        assert.equal(res.statusCode, 200); 
        assert.isDefined(res.body);
        done();
      })
      .catch((err) => done(err));
  });
});


const makeHttpRequest = (options, data = null) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      const body = [];
      res.on('data', (chunk) => body.push(chunk));
      res.on('end', () => {
        res.body = Buffer.concat(body).toString('utf-8');
        resolve(res);
      });
    });
    req.on('error', (err) => {
      reject(err);
    });
    if (data) req.write(data);
    req.end();
  });
}
