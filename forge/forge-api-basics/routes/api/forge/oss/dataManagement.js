const express = require('express');

const config = require('../../../../config');
const httpRequests = require('../../../../helpers/httpRequests');
const forgeAuth = require('../auth/forgeAuth');

const router = express.Router();

router.route('/buckets')
  .get(function(req, res) {
    forgeAuth.get2LeggedToken(config.credentials)
      .then(function(token) {
        httpRequests.get({
          hostname: 'developer.api.autodesk.com',
          port: 443,
          method: 'GET',
          path: '/oss/v2/buckets',
          headers: {
            'Authorization': `Bearer ${JSON.parse(token).access_token}`
          }
        })
          .then(function(buckets) {
            res.json(buckets);
          })
          .catch(function(err) {
            res.json(err);
          });
      })
      .catch(function(err) {
        res.json(err);
      });
  })
  .post(function(req, res) {
    forgeAuth.get2LeggedToken(config.credentials)
      .then(function(token) {
        httpRequests.post({
          hostname: 'developer.api.autodesk.com',
          port: 443,
          method: 'POST',
          path: '/oss/v2/buckets',
          headers: {
            'Authorization': `Bearer ${JSON.parse(token).access_token}`,
            'Content-Type': 'application/json',
            'x-ads-region': 'US'
          }
        }, JSON.stringify(req.body))
          .then(function(bucket) {
            res.json(bucket);
          })
          .catch(function(err) {
            res.json(err);
          });
      })
      .catch(function(err) {
        res.json(err);
      });
  });

module.exports = router;
