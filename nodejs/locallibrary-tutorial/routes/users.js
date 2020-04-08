const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
	res.send(`${req.url}: respond with a resource`);
});

router.get('/cool', (req, res) => {
	res.send('You are so cool!');
});

module.exports = router;
