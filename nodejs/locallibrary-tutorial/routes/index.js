const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
	res.redirect('/catalog');
//	res.render('index', { title: 'Express' });
});

module.exports = router;
