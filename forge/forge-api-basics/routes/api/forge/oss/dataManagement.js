const express = require('express');
const multer = require('multer');
const busboy = require('busboy');

const config = require('../../../../config');
const httpClient = require('../../../../helpers/httpClient');
const forgeAuth = require('../auth/forgeAuth');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.route('/buckets')
  .get(function(req, res) {
    httpClient.makeHttpRequest({
      hostname: 'developer.api.autodesk.com',
      port: 443,
      method: 'GET',
      path: '/oss/v2/buckets',
      headers: {
        'Authorization': `Bearer ${req.token.access_token}`
      }
    })
      .then(function(bucketsRes) {
        res.statusCode = bucketsRes.statusCode;
        res.json(bucketsRes.body);
      })
      .catch(function(err) {
        res.json(err);
      });
  })
  .post(function(req, res) {    
    httpClient.makeHttpRequest({
      hostname: 'developer.api.autodesk.com',
      port: 443,
      method: 'POST',
      path: '/oss/v2/buckets',
      headers: {
        'Authorization': `Bearer ${req.token.access_token}`,
        'Content-Type': 'application/json',
        'x-ads-region': 'US'
      }
    }, JSON.stringify(req.body))
      .then(function(bucketsRes) {
        res.statusCode = bucketsRes.statusCode;
        res.json(bucketsRes.body);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

router.get('/buckets/:bucketKey/details', function(req, res) {
  httpClient.makeHttpRequest({
    hostname: 'developer.api.autodesk.com',
    port: 443,
    path: `/oss/v2/buckets/${req.params.bucketKey}/details`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${req.token.access_token}`
    }
  })
    .then(function(bucketsRes) {
      res.statusCode = bucketsRes.statusCode;
      res.json(bucketsRes.body);
    })
    .catch(function(err) {
      res.json(err);
    });    
});

router.delete('/buckets/:bucketKey', function(req, res) {
  httpClient.makeHttpRequest({
    hostname: 'developer.api.autodesk.com',
    port: 443,
    path: `/oss/v2/buckets/${req.params["bucketKey"]}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${req.token.access_token}`
    }
  })
    .then(function(bucketsRes) {
      res.statusCode = bucketsRes.statusCode;
      res.json(bucketsRes.body);
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.get('/buckets/:bucketKey/objects', function(req, res) {
  httpClient.makeHttpRequest({
    hostname: 'developer.api.autodesk.com',
    port: 443,
    path: `/oss/v2/buckets/${req.params["bucketKey"]}/objects`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${req.token.access_token}`
    }
  })
    .then(function(objectsRes) {
      res.statusCode = objectsRes.statusCode;
      res.json(objectsRes.body);
    })
    .catch(function(err) {
      res.json(err);
    });
});

router
  .get('/buckets/:bucketKey/objects/:objectName', function(req, res) {
    httpClient.makeHttpRequest({
      hostname: 'developer.api.autodesk.com',
      port: 443,
      path: `/oss/v2/buckets/${req.params["bucketKey"]}/`
        + `objects/${req.params["objectName"]}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${req.token.access_token}`,
      }
    })
      .then(function(objectsRes) {
        res.statusCode = objectsRes.statusCode;
        res.json(objectsRes.body);
      })
      .catch(function(err) {
        res.statusCode = 500;
        res.json(err);
      });
  })
  .post('/buckets/:bucketKey/objects/:objectName',
        upload.single('file'), function(req, res) {
          httpClient.makeHttpRequest({
            hostname: 'developer.api.autodesk.com',
            port: 443,
            path: `/oss/v2/buckets/${req.params["bucketKey"]}/`
              + `objects/${req.params["objectName"]}`,
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${req.token.access_token}`,
              'Content-Type': req.file.mimetype,
              'Content-Length': req.file.size
            }
          }, req.file.buffer)
            .then(function(uploadRes) {
              res.statusCode = uploadRes.statusCode;
              res.json(uploadRes.body);
            })
            .catch(function(err) {
              res.statusCode = 500;
              res.json(err);
            });
        })
  .post('/buckets/:bucketKey/objects/:objectName/resumable', function(req, res) {
    const bb = busboy({ headers: req.headers });
    const fileSize = req.get('Content-Length');
    bb.on('file', (name, file, info) => {
      console.log(`File: ${name} ${file} ${info}`);
      let uploaded = 0;
      let block = '';
      file.on('data', (chunk) => {
        if (block.length >= 5 * 1024 * 1024) {
          console.log(`uploading ${uploaded}-${uploaded + block.length - 1}/${fileSize}`);
          uploaded += block.length;
          block = '';
        } else {
          block += chunk;
        }
        //console.log('chunk: ' + chunk.length);
      });
      file.on('end', () => {
        if (block.length) {
          console.log(`uploading ${uploaded}-${fileSize - 1}/${fileSize}`);
        }
        console.log('done uploading the file');
      });
      file.resume();
    });
    bb.on('field', (name, value, info) => {
      console.log(`Field: ${name} ${value} ${info}`);
    });
    bb.on('finish', () => {
      res.writeHeader(200, { 'Connection': 'close' });
      res.end();
    });
    req.pipe(bb);
  })
  .delete('/buckets/:bucketKey/objects/:objectName', function(req, res) {
    httpClient.makeHttpRequest({
      hostname: 'developer.api.autodesk.com',
      port: 443,
      path: `/oss/v2/buckets/${req.params["bucketKey"]}/`
        + `objects/${req.params["objectName"]}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${req.token.access_token}`,
      }
    })
      .then(function(uploadRes) {
        res.statusCode = uploadRes.statusCode;
        res.json(uploadRes.body);
      })
      .catch(function(err) {
        res.statusCode = 500;
        res.json(err);
      });
  })

router
  .get('/buckets/:bucketKey/objects/:objectKey/details', function(req, res) {
    httpClient.makeHttpRequest({
      hostname: 'developer.api.autodesk.com',
      port: 443,
      path: `/oss/v2/buckets/${req.params["bucketKey"]}/objects`
        + `/${req.params["objectKey"]}/details`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${req.token.access_token}`
      }
    })
      .then(function(objectsRes) {
        res.statusCode = objectsRes.statusCode;
        res.json(objectsRes.body);
      })
      .catch(function(err) {
        res.statusCode = 500;
        res.json(err);
      });
  });

module.exports = router;
