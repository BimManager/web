const express = require('express');

const router = express.Router();

router.get('/token', (req, res, next) => {
	res.send('oauth');
});

module.exports = router;

