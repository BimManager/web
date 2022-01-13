const express = require('express');

const config = require('../../../../config');
const forgeAuth = require('./forgeAuth');

const router = express.Router();

router.route('/token')
  .get(function(req, res) {
    forgeAuth.get2LeggedToken(config.credentials)
      .then(function(token) {
        res.json(token)
      })
      .catch(function(err) {
        res.json(err);
      });
  });

module.exports = router;
