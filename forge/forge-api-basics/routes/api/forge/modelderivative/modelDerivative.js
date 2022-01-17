const express = require('express');

const httpClient = require('../../../../helpers/httpClient');

const router = express.Router();

router.get('/formats', function(req, res) {
  httpClient.makeHttpRequest({
    hostname: 'developer.api.autodesk.com',
    port: 443,
    path: '/modelderivative/v2/designdata/formats',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${req.token.access_token}`
    }
  })
    .then(function(formatsRes) {
      res.statusCode = formatsRes.statusCode;
      res.set('Content-Type', 'application/json');
      res.set('Content-Length', formatsRes.body.length);
      res.send(formatsRes.body);
    })
    .catch(function(err) {
      res.statusCode = 500;
      res.json(err);
    });
});

router.post('/job', function(req, res) {
  console.log(req.body.url);
  console.log(req.body.formats);
  httpClient.makeHttpRequest({
    hostname: 'developer.api.autodesk.com',
    port: 443,
    path: '/modelderivative/v2/designdata/job',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${req.token.access_token}`,
      'Content-Type': 'application/json'      
    }
  }, JSON.stringify({
    input: {
      urn: Buffer.from(req.body["urn"]).toString('base64')
    },
    output: {
      formats: req.body["formats"]
    }
  }))
    .then(function(jobRes) {
      res.statusCode = jobRes.statusCode;
      res.set('Content-Type', 'application/json');
      res.set('Content-Length', jobRes.body.length);
      res.send(jobRes.body);
    })
    .catch(function(err) {
      res.statusCode = 500;
      res.json(err);
    });
});

router.get('/:urn/manifest', function(req, res) {
  httpClient.makeHttpRequest({
    hostname: 'developer.api.autodesk.com',
    port: 443,
    path: `/modelderivative/v2/designdata/${req.params["urn"]}/manifest`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${req.token.access_token}`
    }
  })
    .then(function(manifestRes) {
      res.statusCode = manifestRes.statusCode;
      res.set('Content-Type', 'application/json');
      res.set('Content-Length', manifestRes.body.length);
      res.send(manifestRes.body);
    })
    .catch(function(err) {
      res.statusCode = 500;
      res.json(err);
    });
});

router.get('/:urn/thumbnail', function(req, res) {
  httpClient.makeHttpRequest({
    hostname: 'developer.api.autodesk.com',
    port: 443,
    path: `/modelderivative/v2/designdata/${req.params["urn"]}/thumbnail`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${req.token.access_token}`
    }
  })
    .then(function(thumbnailRes) {
      res.statusCode = thumbnailRes.statusCode;
      res.set('Content-Type', thumbnailRes.headers["content-type"]);
      res.set('Content-Length', thumbnailRes.body.length);
      res.send(thumbnailRes.body);
    })
    .catch(function(err) {
      res.statusCode = 500;
      res.json(err);
    });
});

router.get('/:urn/metadata/:guid?', function(req, res) {
  httpClient.makeHttpRequest({
    hostname: 'developer.api.autodesk.com',
    port: 443,
    path: `/modelderivative/v2/designdata/${req.params["urn"]}/metadata`
      + (req.params.guid ? `/${req.params.guid}` : ''),
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${req.token.access_token}`
    }
  })
    .then(function(metadataRes) {
      res.statusCode = metadataRes.statusCode;
      res.set('Content-Type', metadataRes.headers["content-type"]);
      res.set('Content-Length', metadataRes.body.length);
      res.send(metadataRes.body);
    })
    .catch(function(err) {
      res.statusCode = 500;
      res.json(err);
    });
});

router.get('/:urn/metadata/:guid/properties', function(req, res) {
  httpClient.makeHttpRequest({
    hostname: 'developer.api.autodesk.com',
    port: 443,
    path: `/modelderivative/v2/designdata/${req.params["urn"]}/metadata`
      + `/${req.params.guid}/properties`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${req.token.access_token}`
    }
  })
    .then(function(metadataRes) {
      res.statusCode = metadataRes.statusCode;
      res.set('Content-Type', 'application/json');
      res.set('Content-Length', metadataRes.body.length);
      res.send(metadataRes.body);
    })
    .catch(function(err) {
      res.statusCode = 500;
      res.json(err);
    });
});

module.exports = router;
